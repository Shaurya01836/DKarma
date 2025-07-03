

export default function ProfilePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">👤 Profile</h1>
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-md shadow">
        <p className="text-neutral-700 dark:text-neutral-200">
          Welcome to your profile page. Here you can update your personal information.
        </p>
        {/* You can add profile form fields later */}
      </div>
    </div>
  );
}
