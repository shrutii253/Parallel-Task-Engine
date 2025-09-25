import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [response, setResponse] = useState("");
  const [tasks, setTasks] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef(null);

  const submitTask = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/tasks/submit", {
        taskName,
        priority: parseInt(priority)
      });
      setResponse(res.data);
      setTaskName("");
      setPriority("");
      setShowTable(true);
      setTimeout(() => {
        if (tableRef.current) {
          tableRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } catch (err) {
      console.error(err);
      setResponse("Error submitting task");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks/list");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMetrics = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks/metrics");
      setMetrics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchTasks, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4" style={{background: 'repeating-radial-gradient(circle at 50% 50%, #0f172a 0px, #1e293b 400px, #0f172a 800px)'}}>
      <h1 className="flex items-center justify-center text-5xl font-extrabold mb-8 drop-shadow-lg tracking-widest text-neon-green" style={{fontFamily: 'Share Tech Mono, monospace', color: '#00ff99', textShadow: '0 0 20px #00ff99, 0 0 40px #00ff99'}}>
        <span className="mr-4" role="img" aria-label="robot">🤖</span>
        Parallel Task Engine
      </h1>
      <form onSubmit={submitTask} className="bg-black bg-opacity-60 rounded-xl shadow-2xl p-8 mb-8 w-full max-w-xl flex flex-col gap-4 border-2 border-green-400 items-center" style={{fontFamily: 'Share Tech Mono, monospace'}}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-black bg-opacity-80 text-lg mb-2 text-neon-green placeholder-green-300 w-full"
          style={{fontFamily: 'Share Tech Mono, monospace', color: '#00ff99'}}
        />
        <input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-black bg-opacity-80 text-lg mb-2 text-neon-green placeholder-green-300 w-full"
          style={{fontFamily: 'Share Tech Mono, monospace', color: '#00ff99'}}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-green-700 text-black font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-200 border-2 border-green-400 w-full"
          style={{fontFamily: 'Share Tech Mono, monospace'}}
        >
          Submit Task
        </button>
        <p className="text-center text-lg font-semibold mt-2 text-neon-green" style={{color: '#00ff99'}}>{response}</p>
      </form>
      {showTable && (
        <div ref={tableRef}>
          <div className="w-full max-w-3xl mb-8 overflow-x-auto">
            <table className="min-w-full text-neon-green bg-black bg-opacity-60 rounded-xl shadow-2xl border-2 border-green-400" style={{fontFamily: 'Share Tech Mono, monospace'}}>
              <thead className="bg-black bg-opacity-80">
                <tr>
                  <th className="py-3 px-4 text-lg font-bold text-left text-neon-green" style={{color: '#00ff99'}}>Task Name</th>
                  <th className="py-3 px-4 text-lg font-bold text-left text-neon-green" style={{color: '#00ff99'}}>Priority</th>
                  <th className="py-3 px-4 text-lg font-bold text-left text-neon-green" style={{color: '#00ff99'}}>Status</th>
                  <th className="py-3 px-4 text-lg font-bold text-left text-neon-green" style={{color: '#00ff99'}}>Worker</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index} className="border-b border-green-700 hover:bg-green-900 hover:bg-opacity-30 transition-colors">
                    <td className="py-2 px-4 align-middle text-neon-green" style={{color: '#00ff99'}}>{task.taskName}</td>
                    <td className="py-2 px-4 align-middle text-neon-green" style={{color: '#00ff99'}}>{task.priority}</td>
                    <td className="py-2 px-4 align-middle">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'Running' ? 'bg-yellow-500' : 'bg-gray-500'} text-black`} style={{fontFamily: 'Share Tech Mono, monospace'}}>{task.status}</span>
                    </td>
                    <td className="py-2 px-4 align-middle text-neon-green" style={{color: '#00ff99'}}>{task.workerId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full max-w-xl bg-black bg-opacity-60 rounded-xl shadow-2xl p-6 mb-8 border-2 border-green-400" style={{fontFamily: 'Share Tech Mono, monospace'}}>
            <h3 className="text-2xl font-bold mb-4 text-neon-green" style={{color: '#00ff99'}}>Metrics</h3>
            <div className="flex flex-col gap-2 text-lg">
              <p>Total Tasks Executed: <span className="font-bold text-neon-green" style={{color: '#00ff99'}}>{metrics.totalTasksExecuted}</span></p>
              <p>Average Execution Time: <span className="font-bold text-neon-green" style={{color: '#00ff99'}}>{metrics.averageExecutionTime} ms</span></p>
            </div>
            <h4 className="text-xl font-semibold mt-4 mb-2 text-neon-green" style={{color: '#00ff99'}}>Tasks Per Worker:</h4>
            <div className="flex flex-wrap gap-2">
              {metrics.tasksPerWorker && Object.entries(metrics.tasksPerWorker).map(([worker, count]) => (
                <span key={worker} className="bg-green-700 bg-opacity-70 text-black px-3 py-1 rounded-full text-sm font-bold shadow border border-green-400" style={{fontFamily: 'Share Tech Mono, monospace'}}>{worker}: {count}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
