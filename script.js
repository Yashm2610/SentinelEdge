document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telemetry Chart
    const telemetryCtx = document.getElementById('telemetryChart').getContext('2d');
    
    // Gradient for chart
    const gradient = telemetryCtx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

    const telemetryChart = new Chart(telemetryCtx, {
        type: 'line',
        data: {
            labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [65, 68, 70, 72, 75, 74, 76, 82, 85],
                borderColor: '#00F0FF',
                backgroundColor: gradient,
                borderWidth: 2,
                pointBackgroundColor: '#0B0F19',
                pointBorderColor: '#00F0FF',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(11, 15, 25, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#00F0FF',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' °C';
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94A3B8' },
                    suggestedMin: 50,
                    suggestedMax: 100
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94A3B8', maxRotation: 0 }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });

    // Simulate real-time updates for telemetry chart
    setInterval(() => {
        const data = telemetryChart.data.datasets[0].data;
        const labels = telemetryChart.data.labels;
        
        // Remove first
        data.shift();
        labels.shift();
        
        // Add new
        const lastVal = data[data.length - 1];
        const newVal = lastVal + (Math.random() * 6 - 3);
        data.push(Math.max(60, Math.min(newVal, 95))); // keep between 60 and 95
        
        // generate next time label (rudimentary)
        const lastTime = labels[labels.length-1];
        let [hh, mm] = lastTime.split(':').map(Number);
        mm += 5;
        if(mm >= 60) { mm = 0; hh++; }
        labels.push(`${hh}:${mm.toString().padStart(2, '0')}`);
        
        telemetryChart.update('none'); // Update without animation for smooth flow
    }, 3000);


    // Initialize Energy Chart
    const energyCtx = document.getElementById('energyChart').getContext('2d');
    
    new Chart(energyCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Power (kW)',
                data: [420, 380, 450, 410, 390, 210, 190],
                backgroundColor: '#B200FF',
                borderRadius: 4,
                barThickness: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    display: false,
                    grid: { display: false }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94A3B8', font: { size: 10 } }
                }
            }
        }
    });

    // Filter Buttons Interaction
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Simple mockup behavior to change chart data slightly based on selection
            const type = e.target.textContent;
            let newData = [];
            let newColor = '';
            
            if(type === 'Temp') {
                newData = [65, 68, 70, 72, 75, 74, 76, 82, 85];
                newColor = '#00F0FF';
                telemetryChart.data.datasets[0].label = 'Temperature (°C)';
            } else if (type === 'Vibration') {
                newData = [1.2, 1.4, 1.3, 1.5, 2.0, 2.5, 3.1, 4.0, 4.2];
                newColor = '#FFAB00';
                telemetryChart.data.datasets[0].label = 'Vibration (mm/s)';
            } else if (type === 'Pressure') {
                newData = [100, 102, 101, 100, 99, 98, 97, 95, 94];
                newColor = '#00E676';
                telemetryChart.data.datasets[0].label = 'Pressure (Bar)';
            } else {
                newData = [40, 42, 45, 43, 44, 46, 48, 50, 49];
                newColor = '#B200FF';
                telemetryChart.data.datasets[0].label = 'Power (kW)';
            }

            telemetryChart.data.datasets[0].data = newData;
            telemetryChart.data.datasets[0].borderColor = newColor;
            
            const gradient = telemetryCtx.createLinearGradient(0, 0, 0, 300);
            const hexToRgb = hex => hex.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));
            const [r,g,b] = hexToRgb(newColor.replace('#',''));
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.0)`);
            
            telemetryChart.data.datasets[0].backgroundColor = gradient;
            telemetryChart.data.datasets[0].pointBorderColor = newColor;
            
            telemetryChart.update();
        });
    });

    // Sidebar Navigation Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a, .sidebar-footer a');
    const dashboardView = document.getElementById('dashboard-view');
    const placeholderView = document.getElementById('placeholder-view');
    const placeholderTitle = document.getElementById('placeholder-title');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all
            document.querySelectorAll('.sidebar-nav li, .sidebar-footer li').forEach(li => li.classList.remove('active'));
            
            // Add active class to clicked
            link.parentElement.classList.add('active');
            
            const sectionName = link.textContent.trim();
            
            if (sectionName === 'Dashboard') {
                dashboardView.style.display = 'block';
                placeholderView.style.display = 'none';
            } else {
                dashboardView.style.display = 'none';
                placeholderView.style.display = 'flex';
                placeholderTitle.textContent = sectionName;
            }
        });
    });

    // --- Backend API Integration ---
    
    // Modal Logic
    const btnAddVehicle = document.getElementById('btn-add-vehicle');
    const modal = document.getElementById('add-vehicle-modal');
    const btnCloseModal = document.querySelector('.close-modal');
    const formAddVehicle = document.getElementById('add-vehicle-form');

    if (btnAddVehicle && modal) {
        btnAddVehicle.addEventListener('click', () => modal.classList.add('active'));
        btnCloseModal.addEventListener('click', () => modal.classList.remove('active'));
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
        
        // Form Submission
        formAddVehicle.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const payload = {
                name: document.getElementById('v-name').value,
                machine_type: document.getElementById('v-type').value,
                temperature: parseFloat(document.getElementById('v-temp').value),
                vibration: parseFloat(document.getElementById('v-vib').value)
            };
            
            try {
                // Send to FastAPI
                const response = await fetch('/api/machines', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    alert('Machine successfully registered to the network!');
                    modal.classList.remove('active');
                    formAddVehicle.reset();
                    fetchDashboardData(); // force update
                }
            } catch (err) {
                console.error('Error saving machine:', err);
                alert('Failed to save machine. Ensure backend is running.');
            }
        });
    }

    // Polling Dashboard Data
    async function fetchDashboardData() {
        try {
            const res = await fetch('/api/dashboard');
            if (!res.ok) return;
            const data = await res.json();
            
            const kpiValues = document.querySelectorAll('.kpi-value');
            if (kpiValues.length >= 6) {
                kpiValues[0].innerHTML = `${data.machine_health}<span class="unit">%</span>`;
                kpiValues[1].innerHTML = data.failure_risk;
                kpiValues[2].innerHTML = `${data.running_machines}<span class="unit">/${data.total_machines}</span>`;
                kpiValues[3].innerHTML = `${data.energy_usage}<span class="unit">MW</span>`;
                kpiValues[5].innerHTML = data.alerts_count;
            }
        } catch (err) {
            console.error('Dashboard polling failed:', err);
        }
    }

    // Poll every 3 seconds
    setInterval(fetchDashboardData, 3000);
    // Initial fetch
    fetchDashboardData();
});
