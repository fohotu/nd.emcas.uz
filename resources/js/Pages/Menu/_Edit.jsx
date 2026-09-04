import { useForm } from '@inertiajs/react';

function Edit({ menu, parents = [], onSuccessHandler }) {
  console.log(menu,parents);
  const { data, setData, put, processing, errors, reset } = useForm({
    title: menu.title || '',
    description: menu.description || '',
    sys_name: menu.sys_name || '',
    parent_id: menu.parent_id || '',
    order: menu.order || '',
    route: menu.route || '',
    url:menu.url || '',
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/menu/${menu.id}`, {
      onSuccess: () => {
        onSuccessHandler?.();
      },
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">

      {/* Title */}
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={e => setData('title', e.target.value)}
          className="w-full mt-1 border rounded p-2"
        />
        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={data.description}
          onChange={e => setData('description', e.target.value)}
          className="w-full mt-1 border rounded p-2"
        />
      </div>

      {/* System Name */}
      <div>
        <label className="block text-sm font-medium">System Name</label>
        <input
          type="text"
          value={data.sys_name}
          onChange={e => setData('sys_name', e.target.value)}
          className="w-full mt-1 border rounded p-2"
        />
      </div>

      {/* Parent */}
      <div>
        <label className="block text-sm font-medium">Parent Menu</label>
        <select
          value={data.parent_id}
          onChange={e => setData('parent_id', e.target.value)}
          className="w-full mt-1 border rounded p-2"
        >
          <option value="">-- No Parent --</option>
          {parents.map(parent => {
            return (<option key={parent.id} value={parent.id}>
              {parent.title}
            </option>)
          })}
        </select>
      </div>

      {/* Order */}
      <div>
        <label className="block text-sm font-medium">Order</label>
        <input
          type="number"
          value={data.order}
          onChange={e => setData('order', e.target.value)}
          className="w-full mt-1 border rounded p-2"
        />
      </div>

      {/* Route URL */}
      <div>
        <label className="block text-sm font-medium">Route</label>
        <input
          type="text"
          value={data.route}
          onChange={e => setData('route', e.target.value)}
          className="w-full mt-1 border rounded p-2"
        />
      </div>

      {/* Route URL */}
      <div>
        <label className="block text-sm font-medium">Url</label>
        <input
          type="text"
          value={data.url}
          onChange={e => setData('url', e.target.value)}
          className="w-full mt-1 border rounded p-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={processing}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Update Menu
        </button>

      </div>
    </form>
  );
}

export default Edit;