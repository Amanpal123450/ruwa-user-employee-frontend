import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Wrench, DollarSign, Clock, X } from 'lucide-react';

const categories = ['Installation', 'Maintenance', 'Repair', 'Upgrade', 'Consultation', 'Training', 'Inspection', 'Custom'];

const getInitialServices = () => [
  { id: '1', name: 'Installation Service', description: 'Complete installation of equipment and systems', category: 'Installation', price: 299, duration: 120, isActive: true, area: 'North', assignedEmployees: 5, bookingsThisMonth: 23 },
  { id: '2', name: 'Maintenance Check', description: 'Regular maintenance and inspection', category: 'Maintenance', price: 149, duration: 60, isActive: true, area: 'North', assignedEmployees: 4, bookingsThisMonth: 45 },
  { id: '3', name: 'Emergency Repair', description: '24/7 emergency repair service', category: 'Repair', price: 399, duration: 90, isActive: true, area: 'North', assignedEmployees: 3, bookingsThisMonth: 18 },
  { id: '4', name: 'System Upgrade', description: 'Upgrade existing systems to latest version', category: 'Upgrade', price: 499, duration: 180, isActive: true, area: 'North', assignedEmployees: 4, bookingsThisMonth: 12 },
  { id: '5', name: 'Consultation', description: 'Expert consultation and planning', category: 'Consultation', price: 99, duration: 45, isActive: true, area: 'North', assignedEmployees: 2, bookingsThisMonth: 31 },
  { id: '6', name: 'Training Session', description: 'User training and onboarding', category: 'Training', price: 199, duration: 90, isActive: false, area: 'North', assignedEmployees: 2, bookingsThisMonth: 8 },
  { id: '7', name: 'Inspection Service', description: 'Detailed inspection and report', category: 'Inspection', price: 179, duration: 75, isActive: true, area: 'North', assignedEmployees: 3, bookingsThisMonth: 15 },
  { id: '8', name: 'Custom Solution', description: 'Tailored solutions for specific needs', category: 'Custom', price: 599, duration: 240, isActive: true, area: 'North', assignedEmployees: 5, bookingsThisMonth: 7 },
];

function Dialog({ open, onClose, title, description, children, footer }) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-4">{children}</div>
        {footer && <div className="flex gap-2 justify-end">{footer}</div>}
      </div>
    </div>
  );
}

export default function ServicesManagement() {
  const vendorArea = 'North';
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState(getInitialServices().filter(s => s.area === vendorArea));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    isActive: true,
  });

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeServices = services.filter(s => s.isActive).length;
  const totalRevenue = services.reduce((sum, s) => sum + (s.price * s.bookingsThisMonth), 0);
  const totalBookings = services.reduce((sum, s) => sum + s.bookingsThisMonth, 0);

  const handleAddService = () => {
    const newService = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      isActive: formData.isActive,
      area: vendorArea,
      assignedEmployees: 0,
      bookingsThisMonth: 0,
    };
    setServices([...services, newService]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditService = () => {
    if (!editingService) return;
    
    setServices(services.map(s => 
      s.id === editingService.id 
        ? {
            ...s,
            name: formData.name,
            description: formData.description,
            category: formData.category,
            price: parseFloat(formData.price),
            duration: parseInt(formData.duration),
            isActive: formData.isActive,
          }
        : s
    ));
    resetForm();
    setEditingService(null);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const toggleServiceStatus = (id) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      duration: '',
      isActive: true,
    });
  };

  const openEditDialog = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price.toString(),
      duration: service.duration.toString(),
      isActive: service.isActive,
    });
  };

  return (<>
  <br/>
  <br/>
  <br/>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Services Management</h2>
            <p className="text-gray-600 mt-1">Manage services available in the {vendorArea} area</p>
          </div>
          <button 
            onClick={() => { resetForm(); setIsAddDialogOpen(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold">{services.length}</div>
            <p className="text-xs text-gray-600 mt-1">Total Services</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">{activeServices}</div>
            <p className="text-xs text-gray-600 mt-1">Active Services</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-gray-600 mt-1">Total Bookings</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Monthly Revenue</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className={`bg-white rounded-lg shadow ${!service.isActive ? 'opacity-60' : ''}`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                    </div>
                    <span className="inline-block px-2 py-1 text-xs border border-gray-300 rounded">{service.category}</span>
                  </div>
                  <button
                    onClick={() => toggleServiceStatus(service.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      service.isActive ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      service.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>Price</span>
                    </div>
                    <span className="font-medium">${service.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Duration</span>
                    </div>
                    <span className="font-medium">{service.duration} min</span>
                  </div>
                  <div className="pt-3 border-t space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Assigned Employees</span>
                      <span className="font-medium">{service.assignedEmployees}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Bookings This Month</span>
                      <span className="font-medium text-green-600">{service.bookingsThisMonth}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <button
                      onClick={() => openEditDialog(service)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1 text-sm"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            No services found matching your search.
          </div>
        )}

        {/* Add Dialog */}
        <Dialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          title="Add New Service"
          description={`Create a new service for the ${vendorArea} area`}
          footer={
            <>
              <button onClick={() => setIsAddDialogOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleAddService} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Service
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Service Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Installation Service"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the service..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Price ($)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="299"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Duration (min)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Active Service</label>
              <button
                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.isActive ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isActive ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog
          open={editingService !== null}
          onClose={() => setEditingService(null)}
          title="Edit Service"
          description="Update service information"
          footer={
            <>
              <button onClick={() => setEditingService(null)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleEditService} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Service Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Price ($)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Duration (min)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Active Service</label>
              <button
                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.isActive ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isActive ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div></>
  );
}