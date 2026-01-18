import React, { use } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function ContestDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state?.pastContest;

  if (!data) {
    return (
      <div className="text-red-500 p-6">
        ❌ Contest data not found. Try navigating from dashboard.
        <button
          className="ml-4 bg-blue-600 px-4 py-2 rounded text-white"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { contest, leaderboard, problemList, userRank, totalParticipants } = data;
  console.log("Leaderboard:", leaderboard);

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case "easy":
        return { badge: "bg-green-700 text-green-200", icon: "🟢" };
      case "medium":
        return { badge: "bg-yellow-700 text-yellow-100", icon: "🟡" };
      case "hard":
        return { badge: "bg-red-700 text-red-200", icon: "🔴" };
      default:
        return { badge: "bg-gray-700 text-gray-200", icon: "❔" };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-66 py-8 mx-auto">
      {/* Header */}
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800 mb-6">
        <h1 className="text-3xl font-bold text-green-400">{contest.contestName}</h1>
        <p className="text-gray-400 mt-2">{contest.contestDescription}</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div><strong>Start:</strong> {new Date(contest.startTime).toLocaleString()}</div>
          <div><strong>End:</strong> {new Date(contest.endTime).toLocaleString()}</div>
          <div><strong>Duration:</strong> {Math.floor(contest.duration / 60)} minutes</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400">Your Rank</p>
          <h2 className="text-2xl font-bold text-green-400">{userRank}</h2>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400">Total Participants</p>
          <h2 className="text-2xl font-bold text-blue-400">{totalParticipants}</h2>
        </div>
      </div>

      {/* Problem List */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Problem List</h2>
        <div className="space-y-4">
          {problemList.map(({ problem }) => {
            const { problemId, problemTitle, problemDifficulty } = problem;
            const { badge } = getDifficultyColor(problemDifficulty);

            return (
              <div
                key={problemId}
                className="w-full bg-[#1f1f1f] p-4 rounded-lg border border-gray-700 flex justify-between items-center"
              >
                <div>
                  <Link
                    to={`/problemstat/${problemId}`}
                    className="text-white font-medium hover:underline text-left"
                  >
                    {problemTitle}
                  </Link>
                  <div className={`mt-1 ml-8 text-xs inline-block text-gray-300 px-2 py-1 rounded ${badge}`}>
                    {problemDifficulty}
                  </div>
                </div>
                <Link
                  to={`/problemstat/${problemId}`}
                  className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                >
                  Solve Now
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-600">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-2 border border-gray-700">Rank</th>
                <th className="p-2 border border-gray-700">Name</th>
                <th className="p-2 border border-gray-700">Percentage</th>
                <th className="p-2 border border-gray-700">Time Taken (sec)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                
                leaderboard.map((user, i) => (
                  <tr key={i} className="text-center text-gray-300 hover:bg-gray-800">
                    <td className="p-2 border border-gray-700">{user.rank}</td>
                    <td className="p-2 border border-gray-700">{user.name}</td>
                    <td className="p-2 border border-gray-700">{user.percentage}%</td>
                    <td className="p-2 border border-gray-700">{user.timeTaken}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-400">
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-5 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-white"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
