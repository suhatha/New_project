import { useNavigate } from "react-router-dom";


function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Unauthorized</h2>
        <p>You do not have permission to access this page.</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;