
import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

function List() {
    const [taskData, setTaskData] = useState([]);

    useEffect(() => {
        getListData();
    }, []);

   
    const getListData = async () => {
        try {
            let list = await fetch("http://localhost:3200/tasks");
            list = await list.json();

            if (list.success) {
                setTaskData(list.result);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

  
    const deleteTask = async (id) => {
        try {
            let item = await fetch(
                "http://localhost:3200/delete/" + id,
                {
                    method: "DELETE",
                }
            );

            item = await item.json();

            if (item.success) {
                getListData();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    
    const toggleTask = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:3200/toggle-task/${id}`,
                {
                    method: "PUT",
                }
            );

            const data = await response.json();

            if (data.success) {
                getListData();
            }
        } catch (error) {
            console.error("Toggle task error:", error);
        }
    };

   
    const getPriorityStyle = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "bg-red-500/20 text-red-400 border border-red-500/30";

            case "medium":
                return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";

            case "low":
                return "bg-green-500/20 text-green-400 border border-green-500/30";

            default:
                return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-6">

            <div className="w-full max-w-6xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">

                {/* HEADER */}
                <h1 className="text-4xl font-bold text-center text-white mb-8 tracking-wide">
                    ✨ TO DO LIST
                </h1>

                {/* TABLE HEADER */}
                <div className="grid grid-cols-6 bg-white/10 text-white font-semibold text-lg rounded-2xl p-4 mb-4 border border-white/10">

                    <h2 className="text-center">S.No</h2>

                    <h2 className="text-center">Title</h2>

                    <h2 className="text-center">Description</h2>

                    <h2 className="text-center">Priority</h2>

                    <h2 className="text-center">Status</h2>

                    <h2 className="text-center">Action</h2>

                </div>


                {/* TASK LIST */}
                <div className="space-y-4">

                    {taskData.length === 0 ? (

                        <div className="text-center text-gray-400 py-10">
                            No tasks available
                        </div>

                    ) : (

                        taskData.map((item, index) => (

                            <Fragment key={item._id}>

                                <div
                                    className={`grid grid-cols-6 items-center bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 rounded-2xl p-4 text-white shadow-lg hover:scale-[1.01] ${
                                        item.completed ? "opacity-70" : ""
                                    }`}
                                >

                                    {/* S.NO */}
                                    <div className="flex justify-center">

                                        <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-md">
                                            {index + 1}
                                        </span>

                                    </div>


                                    {/* TITLE */}
                                    <div
                                        className={`text-center font-semibold text-lg ${
                                            item.completed
                                                ? "line-through text-gray-500"
                                                : ""
                                        }`}
                                    >
                                        {item.title}
                                    </div>


                                    {/* DESCRIPTION */}
                                    <div className="text-center text-gray-300">
                                        {item.description}
                                    </div>


                                    {/* PRIORITY */}
                                    <div className="flex justify-center">

                                        <span
                                            className={`px-4 py-2 rounded-full font-bold uppercase text-sm ${getPriorityStyle(
                                                item.priority
                                            )}`}
                                        >
                                            {item.priority || "medium"}
                                        </span>

                                    </div>


                                    {/* STATUS */}
                                    <div className="flex flex-col items-center gap-2">

                                        <button
                                            onClick={() =>
                                                toggleTask(item._id)
                                            }
                                            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                                                item.completed
                                                    ? "bg-green-600 hover:bg-green-700"
                                                    : "bg-gray-600 hover:bg-gray-700"
                                            }`}
                                        >
                                            {item.completed
                                                ? "✓ DONE"
                                                : "○ PENDING"}
                                        </button>

                                    </div>


                                    {/* ACTIONS */}
                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() =>
                                                deleteTask(item._id)
                                            }
                                            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all"
                                        >
                                            Delete
                                        </button>

                                        <Link
                                            to={"update/" + item._id}
                                            className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all no-underline"
                                        >
                                            Update
                                        </Link>

                                    </div>

                                </div>

                            </Fragment>

                        ))
                    )}

                </div>

            </div>

        </div>
    );
}

export default List;

