
import { useForm,router } from '@inertiajs/react';

function Create ({ parents = [],onSuccessHandler,onErrorHandler }) {
  const { data, setData, post, processing, errors,reset } = useForm({
    title: '',
    description: '',
    sys_name: '',
    parent_id: '',
    order: '',
    route_url: '',
  });

  const submit = (e) => {
        e.preventDefault();
        post(`/menu`,{
          onSuccess: () => {
            onSuccessHandler?.();
            
          },
          onError: (errors) => {
           // onError(errors);
          }
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
          {parents.map(parent => (
            <option key={parent.id} value={parent.id}>
              {parent.title}
            </option>
          ))}
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
        <label className="block text-sm font-medium">Route URL</label>
        <input
          type="text"
          value={data.route_url}
          onChange={e => setData('route_url', e.target.value)}
          placeholder="/dashboard"
          className="w-full mt-1 border rounded p-2"
        />
      </div>

      {/* Submit */}
      <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
        Save Menu
      </button>
       <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Очистить
          </button>

    </form>
  );
}


export default Create;