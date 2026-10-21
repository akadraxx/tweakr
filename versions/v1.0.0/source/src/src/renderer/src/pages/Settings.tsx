export default function Settings() {
  const checkUpdate = () => (window as any).tweakrAPI.updater.check()
  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-100 mb-6">Settings</h1>
      <div className="bg-[#131620] border border-[#1e2130] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-100">Check for Updates</p>
          <p className="text-xs text-gray-500 mt-1">Current version: 1.0.0</p>
        </div>
        <button onClick={checkUpdate} className="px-4 py-1.5 rounded bg-violet-600 hover:bg-violet-700 text-sm text-white">Check</button>
      </div>
    </div>
  )
}
