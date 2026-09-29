import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTask() {
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "medium",
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTask(id);
    }, [id]);

    const getTask = async (id) => {
        try {
            setLoading(true);

            const response = await fetch(
                `http://localhost:3200/task/${id}`
            );

            const task = await response.json();

            if (task.success && task.result) {
                setTaskData({
                    _id: task.result._id,
                    title: task.result.title || "",
                    description: task.result.description || "",
                    priority: task.result.priority || "medium",
                    completed: task.result.completed || false,
                });
            } else {
                setError("Task not found.");
            }
        } catch (error) {
            console.error(error);
            setError("Unable to load task.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!taskData.title.trim()) {
            setError("Task title cannot be empty.");
            return;
        }

        try {
            setUpdating(true);
            setError("");
            setMessage("");

            const response = await fetch(
                "http://localhost:3200/update-task",
                {
                    method: "PUT",
                    body: JSON.stringify(taskData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = await response.json();

            console.log("Update response:", result);

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Failed to update task"
                );
            }

            setMessage("Task updated successfully! ✓");

            setTimeout(() => {
                navigate("/");
            }, 1200);

        } catch (error) {
            console.error("Update error:", error);
            setError(error.message || "Failed to update task.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-black flex items-center justify-center text-white">
                <div className="text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-gray-300">
                        Loading task...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-black p-6 flex items-center justify-center">

            <div className="max-w-md w-full mx-auto p-8 bg-white/10 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.45)] border border-white/20">

                <div className="mb-8 text-center">

                    <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
                        Update Task
                    </h1>

                    <p className="text-sm text-gray-300 mt-3">
                        Update the details of your task.
                    </p>

                </div>

                {message && (
                    <div className="mb-6 p-4 rounded-2xl bg-green-500/15 border border-green-400/30 text-green-300 text-center font-semibold">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-400/30 text-red-300 text-center font-semibold">
                        {error}
                    </div>
                )}

                {/* Title */}
                <div className="mb-5">

                    <label
                        htmlFor="title"
                        className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                        Task Title
                    </label>

                    <input
                        value={taskData.title}
                        onChange={(event) =>
                            setTaskData({
                                ...taskData,
                                title: event.target.value,
                            })
                        }
                        type="text"
                        id="title"
                        name="title"
                        placeholder="e.g., Update landing page UI"
                        className="block w-full px-5 py-4 text-white bg-white/5 border border-white/10 rounded-2xl shadow-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 outline-none placeholder-gray-400"
                    />

                </div>

                {/* Description */}
                <div className="mb-5">

                    <div className="flex justify-between items-center mb-2">

                        <label
                            htmlFor="description"
                            className="block text-sm font-semibold text-gray-200"
                        >
                            Description
                        </label>

                        <span className="text-xs text-gray-400 font-medium">
                            Optional
                        </span>

                    </div>

                    <textarea
                        value={taskData.description}
                        onChange={(event) =>
                            setTaskData({
                                ...taskData,
                                description: event.target.value,
                            })
                        }
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Add any extra details, links, or notes..."
                        className="block w-full px-5 py-4 text-white bg-white/5 border border-white/10 rounded-2xl shadow-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 outline-none placeholder-gray-400 resize-none"
                    />

                </div>

                /* Priority */
                <div className="mb-6">

                    <label
                        htmlFor="priority"
                        className="block text-sm font-semibold text-gray-200 mb-2"
                    >
                        Task Priority
                    </label>

                    <select
                        id="priority"
                        name="priority"
                        value={taskData.priority}
                        onChange={(event) =>
                            setTaskData({
                                ...taskData,
                                priority: event.target.value,
                            })
                        }
                        className="block w-full px-5 py-4 text-white bg-white/5 border border-white/10 rounded-2xl shadow-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 outline-none"
                    >
                        <option value="high" className="bg-gray-900">
                            🔴 High Priority
                        </option>

                        <option value="medium" className="bg-gray-900">
                            🟡 Medium Priority
                        </option>

                        <option value="low" className="bg-gray-900">
                            🟢 Low Priority
                        </option>
                    </select>

                </div>

                {/* Buttons */}
                <div className="pt-2 flex items-center justify-between gap-4">

                    <button
                        onClick={() => navigate("/")}
                        type="button"
                        disabled={updating}
                        className="px-6 py-4 rounded-2xl text-base font-bold text-gray-200 bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        type="button"
                        disabled={updating}
                        className={`flex-1 flex justify-center py-4 px-4 rounded-2xl text-base font-bold text-white transition-all duration-300 ${
                            updating
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] active:scale-[0.98]"
                        }`}
                    >
                        {updating
                            ? "⏳ Updating..."
                            : "✨ Update Task"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default UpdateTask;