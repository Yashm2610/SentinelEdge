from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine
from pydantic import BaseModel

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SentinelEdge AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class MachineCreate(BaseModel):
    name: str
    machine_type: str
    temperature: float
    vibration: float

@app.post("/api/machines")
def create_machine(machine: MachineCreate, db: Session = Depends(get_db)):
    db_machine = models.Machine(**machine.model_dump())
    
    if machine.temperature > 85 or machine.vibration > 4.0:
        db_machine.status = "Warning"
    if machine.temperature > 95 or machine.vibration > 6.0:
        db_machine.status = "Critical"
        
    db.add(db_machine)
    db.commit()
    db.refresh(db_machine)
    return db_machine

@app.get("/api/dashboard")
def get_dashboard_metrics(db: Session = Depends(get_db)):
    machines = db.query(models.Machine).all()
    
    # Base mock values
    total_machines = 128 + len(machines)
    running_machines = 124 + sum(1 for m in machines if m.is_running)
    
    avg_health = 94.2
    alerts = 3
    failure_risk = "Low"
    
    warnings = sum(1 for m in machines if m.status == "Warning")
    critical = sum(1 for m in machines if m.status == "Critical")
    
    if critical > 0:
        failure_risk = "High"
        alerts += critical
        avg_health -= (critical * 5)
    elif warnings > 0:
        failure_risk = "Medium"
        alerts += warnings
        avg_health -= (warnings * 2)
        
    return {
        "machine_health": max(0, round(avg_health, 1)),
        "failure_risk": failure_risk,
        "running_machines": running_machines,
        "total_machines": total_machines,
        "alerts_count": alerts,
        "energy_usage": round(1.4 + (len(machines) * 0.05), 2)
    }

# Mount static files to serve the frontend directly from FastAPI
app.mount("/", StaticFiles(directory=".", html=True), name="static")
