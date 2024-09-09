export default function ProgressBar({ title, value, max }) {
    const percentage = (value / max) * 100;
  
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">{`${value} / ${max}`}</p>
      </div>
    );
  }
  