const ErrorSection = ({ missingCapabilities }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-red-900/20">
      <div className="bg-red-900/30 backdrop-blur-lg p-8 rounded-xl max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-red-300 mb-4">
          🚫 Missing Browser Capabilities
        </h2>
        <p className="text-red-200 mb-4">
          This application requires the following AI capabilities that are not
          available in your browser:
        </p>
        <ul className="list-disc list-inside text-red-200 text-left inline-block">
          {missingCapabilities?.map((cap, index) => (
            <li key={index} className="mb-2">
              {cap.name}
            </li>
          ))}
        </ul>
        <p className="text-red-200 mt-6">
          Please use a compatible browser or enable the required features.
        </p>
      </div>
    </div>
  );
};

export default ErrorSection;
