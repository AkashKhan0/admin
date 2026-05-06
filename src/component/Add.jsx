"use client";

import { useEffect, useRef, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Add() {
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [category, setCategory] = useState("");

  const inputRef = useRef();

  const API = process.env.NEXT_PUBLIC_API_URL + "/api/products";

  /* ================= UPLOAD ================= */ 
  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const imageUrls = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setImages([]);
    setName("");
    setCategory("");
    setTitle("");
    setDescription("");
    setEditId(null);
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async () => {
    if (!name) {
      alert("Product name required ❌");
      return;
    }

    if (images.length === 0) {
      alert("At least one image required ❌");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("category", category);
      formData.append("name", name);
      formData.append("title", title);
      formData.append("description", description);

      images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });

      if (editId) {
        await axios.put(`${API}/${editId}`, formData);
      } else {
        await axios.post(API, formData);
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    await axios.delete(`${API}/${id}`);
    fetchProducts();
  };

  /* ================= EDIT ================= */
  const handleEdit = (product) => {
    setEditId(product._id);
    setCategory(product.category || "");
    setName(product.name);
    setTitle(product.title || "");
    setDescription(product.description || "");

    // NOTE: old images show only preview (not file objects)
    setImages(
      product.images.map((img) => ({
        file: null,
        url: img.url,
      })),
    );
  };

  return (
    <div className="w-full h-fit overflow-y-scroll no-scrollbar max-h-[calc(100vh-100px)]">
      {/* ================= IMAGE UPLOAD ================= */}
      <div className="w-full flex flex-wrap gap-4">
        <div
          onClick={handleUploadClick}
          className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
        >
          <FiPlus className="text-3xl text-gray-400" />
        </div>

        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-20 h-20 rounded-xl overflow-hidden border"
          >
            <img
              src={img.url}
              alt="preview"
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-black/60 text-white w-full text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ================= INPUTS ================= */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="w-full mt-2 uni_col gap-2">
        {/* ================= CATEGORY ================= */}
        <div className="flex gap-2 w-full">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value="medical"
              checked={category === "medical"}
              onChange={(e) => setCategory(e.target.value)}
              className="accent-red-600 w-4 h-4"
            />
            <span className="text-lg font-medium">Medical</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value="surgical"
              checked={category === "surgical"}
              onChange={(e) => setCategory(e.target.value)}
              className="accent-red-600 w-4 h-4"
            />
            <span className="text-lg font-medium">Surgical</span>
          </label>
        </div>

        {/* ================= INPUTS ================= */}
        <div className="flex gap-2 w-full">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter product name..."
            className="inp"
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter product title..."
            className="inp"
          />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description..."
          rows={4}
          className="inp"
        />

        {/* ================= BUTTON ================= */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Uploading..." : editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* ================= PRODUCT TABLE ================= */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="border border-gray-300 p-2">
                  <img
                    src={p.images?.[0]?.url}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-2">{p.name}</td>
                <td className="border border-gray-300 p-2">{p.category}</td>
                <td className="border border-gray-300 p-2">{p.title}</td>
                <td className="border border-gray-300 p-2">{p.description}</td>
                <td className="border border-gray-300 p-2">
                  <div className="w-full flex items-center justify-center h-full gap-3">
                     <button
                    onClick={() => handleEdit(p)}
                    className="px-2 py-1 rounded"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-2 py-1 rounded"
                  >
                    <MdDelete />
                  </button>
                  </div>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
