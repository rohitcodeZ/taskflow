
import React, { useState } from "react";

function Add() {

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "medium"
    });

    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const handleAddTask = async () => {

        if (!taskData.title.trim()) {

            setErrorMsg(true);

            setTimeout(() => {
                setErrorMsg(false);
            }, 3000);

            return;
        }

        try {

            console.log(taskData);

            let result = await fetch(
                "http://localhost:3200/add-task",
                {
                    method: "POST",
                    body: JSON.stringify(taskData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            result = await result.json();

            if (result.success) {

                console.log("New task added");

                setTaskData({
                    title: "",
                    description: "",
                    priority: "medium"
                });

                setSuccessMsg(true);

                setTimeout(() => {
                    setSuccessMsg(false);
                }, 3000);

            } else {

                setErrorMsg(true);

                setTimeout(() => {
                    setErrorMsg(false);
                }, 3000);
            }

        } catch (error) {

            console.error("Error adding task:", error);

            setErrorMsg(true);

            setTimeout(() => {
                setErrorMsg(false);
            }, 3000);
        }
    };


    return (

        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-black p-6 flex items-center justify-center">

            <div className="max-w-md w-full mx-auto p-8 bg-white/10 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.45)] border border-white/20 hover:scale-[1.01] transition-all duration-500">

                {/* Error Alert */}
                {
                    errorMsg && (
                        <div className="mb-5 flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-4 rounded-2xl shadow-2xl border border-red-300 animate-pulse">

                            <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-xl">
                                ⚠️
                            </div>

                            <div>
                                <h2 className="font-bold text-lg">
                                    Missing Fields
                                </h2>

                                <p className="text-sm text-red-100">
                                    Please enter a task title.
                                </p>
                            </div>

                        </div>
                    )
                }


                {/* Success Alert */}
                {
                    successMsg && (
                        <div className="mb-5 flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-4 rounded-2xl shadow-2xl border border-green-300 animate-pulse">

                            <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-xl">
                                ✅
                            </div>

                            <div>
                                <h2 className="font-bold text-lg tracking-wide">
                                    Task Created
                                </h2>

                                <p className="text-sm text-green-100">
                                    Your new task has been added successfully.
                                </p>
                            </div>

                        </div>
                    )
                }


                {/* Heading */}
                <div className="mb-8 text-center">

                    <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
                        Add New Task
                    </h1>

                    <p className="text-sm text-gray-300 mt-3">
                        Fill in the details below to create a new task for your list.
                    </p>

                </div>


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
                                title: event.target.value
                            })
                        }

                        type="text"
                        id="title"
                        name="title"

                        placeholder="e.g., Update landing page UI"

                        className="block w-full px-5 py-4 text-white bg-white/5 border border-white/10 rounded-2xl shadow-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 outline-none placeholder-gray-400 hover:border-cyan-300"
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
                                description: event.target.value
                            })
                        }

                        id="description"
                        name="description"
                        rows="4"

                        placeholder="Add any extra details, links, or notes..."

                        className="block w-full px-5 py-4 text-white bg-white/5 border border-white/10 rounded-2xl shadow-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 outline-none placeholder-gray-400 hover:border-cyan-300 resize-none"
                    ></textarea>

                </div>


                {/* PRIORITY */}
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
                                priority: event.target.value
                            })
                        }

                        className="block w-full px-5 py-4 text-white bg-gray-800 border border-white/10 rounded-2xl shadow-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 outline-none"
                    >

                        <option value="high">
                            🔴 High Priority
                        </option>

                        <option value="medium">
                            🟡 Medium Priority
                        </option>

                        <option value="low">
                            🟢 Low Priority
                        </option>

                    </select>

                </div>


                {/* CREATE BUTTON */}
                <div className="pt-2 flex items-center justify-between gap-4">

                    <button
                        onClick={handleAddTask}
                        type="button"

                        className="flex-1 flex justify-center py-4 px-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all duration-300 active:scale-[0.98]"
                    >
                        ✨ Create Task
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Add;

