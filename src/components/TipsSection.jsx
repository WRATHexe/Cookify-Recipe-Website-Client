const TipsSection = () => (
  <section className="max-w-6xl mx-auto px-4 py-12">
    <h2 className="text-2xl font-bold text-center mb-8 border-b-4 border-orange-400 inline-block pb-1 dark:text-gray-100">
      📝 Recipe Tips & Tricks
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-[#23232a] rounded-xl shadow-lg p-6">
        <h3 className="font-semibold mb-2 text-orange-600 dark:text-orange-400">
          Perfect Pasta Every Time
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Salt your water generously and don’t add oil. Stir pasta in the first
          two minutes to prevent sticking.
        </p>
      </div>
      <div className="bg-white dark:bg-[#23232a] rounded-xl shadow-lg p-6">
        <h3 className="font-semibold mb-2 text-orange-600 dark:text-orange-400">
          Knife Skills
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Keep your knives sharp and use the right knife for the job. Practice
          safe chopping techniques for speed and safety.
        </p>
      </div>
      <div className="bg-white dark:bg-[#23232a] rounded-xl shadow-lg p-6">
        <h3 className="font-semibold mb-2 text-orange-600 dark:text-orange-400">
          Baking Basics
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Always preheat your oven and measure ingredients accurately for the
          best baking results.
        </p>
      </div>
    </div>
  </section>
);

export default TipsSection;
