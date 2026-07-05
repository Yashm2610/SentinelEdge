from sqlalchemy import Column, Integer, String, Float, Boolean
from database import Base

class Machine(Base):
    __tablename__ = "machines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    machine_type = Column(String)
    temperature = Column(Float)
    vibration = Column(Float)
    is_running = Column(Boolean, default=True)
    status = Column(String, default="Optimal")
