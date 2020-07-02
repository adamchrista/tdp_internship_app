import React from 'react';

function App() {
  return (
    <div>
      <div className="h-20 w-full items-center rounded-md px-8 bg-gray-200 text-gray-800 flex justify-between">
        <span className="ml-4">Home</span>
        <div className="flex ml-6 font-medium text-lg flex-1 items-start">
          <a href="about" className="ml-4 px-3 py-2 hover:bg-gray-300 rounded-md">About</a>
          <a href="projects" className="ml-4 px-3 py-2 hover:bg-gray-300 rounded-md">Projects</a>
        </div>
      </div>
      <div className="text-gray-800 m-32">
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-center font-extrabold text-6xl">TailwindCSS Starter</h1>
        <div className="ml-5 bg-blue-200 text-blue-600 font-semibold text-xl px-6 py-1 rounded">React</div>
      </div>
      <div>
        <h5 className="text-xl font-bold mb-3">What's Included:</h5>
        <ul className="list-disc inline-block">
          <li>Tailwind CSS</li>
          <li>PostCSS</li>
          <li>Animations via AnimateCSS</li>
        </ul>
      </div>
      <div>
        <h5 className="text-xl font-bold mb-3">Some tips to help you get started: </h5>
        <ul className="list-disc">
          <li>If you're using Visual Studio Code (you should be), install the Tailwind CSS IntelliSense extension. It'll save you a lot of back and forth looking for all of those class names (trust me).</li>
          <li>Use <a href="https://carbon.web.att.com/openspace/graphite">Graphite</a> for easily customizable component styles!</li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default App;
