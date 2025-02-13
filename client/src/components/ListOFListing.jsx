import React, { useEffect, useState } from "react";

const ListOFListing = ({ status }) => {
  const [listings, setListings] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const response = await fetch(`api/listing/get?status=${status}`);

      if (!response.ok) {
        throw new Error("Error fetching listings");
      }

      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [status]);

  const openModal = (listing) => {
    setSelectedProduct(listing);
    setEditMode(false);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const editListing = async (id, status) => {
    try {
      const res = await fetch(`/api/listing/adminUpdateListing?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status === undefined ? selectedProduct?.status : status,
          name: selectedProduct.name,
          description: selectedProduct.description,
          regularPrice: selectedProduct.regularPrice,
          type: selectedProduct.type,
          address: selectedProduct.address,
          city: selectedProduct.city,
          state: selectedProduct.state,
          bedrooms: selectedProduct.bedrooms,
          bathrooms: selectedProduct.bathrooms,
          furnished: selectedProduct.furnished,
          parking: selectedProduct.parking,
        }),
      });
      if (res.status !== 200) {
        throw new Error("Failed to update listing");
      }
      const updatedListing = await res.json();
      console.log("Listing Approved:", updatedListing);
      fetchListings();
    } catch (error) {
      console.error("Error approving listing:", error);
    }
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="p-4 bg-gray-200 rounded-lg animate-pulse shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <div className="mt-6 space-y-4">
          {/* Render multiple skeleton loaders */}
          {[...Array(5)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {listings && listings.length > 0 ? (
            listings.map((listing) => (
              <li
                key={listing._id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100"
              >
                <div className="flex items-center space-x-4">
                  {listing.imageUrls && listing.imageUrls.length > 0 && (
                    <img
                      src={listing.imageUrls[0]}
                      alt={listing.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <span className="text-lg font-medium">{listing.name}</span>
                </div>
                <span>{listing.city}</span>
                <span>{listing.state}</span>
                <span>{listing.type}</span>
                <span>₹{listing.regularPrice.toLocaleString("en-IN")}</span>
                <span
                  className={`text-sm font-semibold ${
                    listing.status === "Approved"
                      ? "text-green-500"
                      : listing.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {listing.status}
                </span>
                <button
                  onClick={() => openModal(listing)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  View
                </button>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg shadow-md">
              No listings available.
            </li>
          )}
        </ul>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Product Details
            </h2>

            <div className="max-h-[60vh] overflow-auto p-6 bg-white rounded-lg shadow-xl">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Name:
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                      value={selectedProduct.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-xl font-medium text-gray-700">
                      {selectedProduct.name}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Description:
                  </label>
                  {editMode ? (
                    <textarea
                      name="description"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                      value={selectedProduct.description}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-lg text-gray-700">
                      {selectedProduct.description}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Price:
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="regularPrice"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                      value={selectedProduct.regularPrice}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-xl font-semibold text-gray-800">
                      ₹{selectedProduct.regularPrice.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Type:
                  </label>
                  {editMode ? (
                    <select
                      name="type"
                      className="w-full p-2 border rounded-lg mt-2"
                      value={selectedProduct.type}
                      onChange={handleChange}
                    >
                      <option value="rent">Rent</option>
                      <option value="sale">Sale</option>
                    </select>
                  ) : (
                    <p className="mt-2 text-lg text-gray-700">
                      {selectedProduct.type}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Address:
                  </label>
                  {editMode ? (
                    <textarea
                      name="address"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                      value={selectedProduct.address}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-lg text-gray-700">
                      {selectedProduct.address}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    City:
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="city"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                      value={selectedProduct.city}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-lg text-gray-700">
                      {selectedProduct.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    State:
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="state"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                      value={selectedProduct.state}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-lg text-gray-700">
                      {selectedProduct.state}
                    </p>
                  )}
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Bedrooms:
                  </label>
                  {editMode ? (
                    <input
                      type="number"
                      name="bedrooms"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                      value={selectedProduct.bedrooms}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-lg text-gray-700">
                      {selectedProduct.bedrooms}
                    </p>
                  )}
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Bathrooms:
                  </label>
                  {editMode ? (
                    <input
                      type="number"
                      name="bathrooms"
                      className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                      value={selectedProduct.bathrooms}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-lg text-gray-700">
                      {selectedProduct.bathrooms}
                    </p>
                  )}
                </div>

                {/* Furnished */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Furnished:
                  </label>
                  {editMode ? (
                    <input
                      type="checkbox"
                      name="furnished"
                      className="mt-2"
                      checked={selectedProduct.furnished}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-lg text-gray-700">
                      {selectedProduct.furnished ? "Yes" : "No"}
                    </p>
                  )}
                </div>

                {/* Parking */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Parking:
                  </label>
                  {editMode ? (
                    <input
                      type="checkbox"
                      name="parking"
                      className="mt-2"
                      checked={selectedProduct.parking}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="mt-2 text-lg text-gray-700">
                      {selectedProduct.parking ? "Yes" : "No"}
                    </p>
                  )}
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Images:
                  </label>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {selectedProduct.imageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`image-${index}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              {editMode ? (
                <>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                    onClick={() => {
                      editListing(selectedProduct?._id);
                      closeModal();
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {status === "Pending" && (
                    <>
                      <button
                        onClick={() => {
                          editListing(selectedProduct?._id, "Rejected");
                          closeModal();
                        }}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => setEditMode(true)}
                        className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          editListing(selectedProduct?._id, "Approved");
                          closeModal();
                        }}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                      >
                        Approve
                      </button>
                    </>
                  )}
                  {status === "Approved" && (
                    <button
                      onClick={() => {
                        editListing(selectedProduct?._id, "Rejected");
                        closeModal();
                      }}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Reject
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListOFListing;
