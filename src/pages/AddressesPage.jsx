import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { MapPin, Plus, Trash2, Edit2, Check, User, Phone, Home, Locate, Bookmark, Globe } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { 
  selectAddresses, 
  addAddress, 
  updateAddress, 
  deleteAddress, 
  setDefaultAddress 
} from "../store/slices/profileSlice";
import { Card, Button, Input, Modal, Badge } from "../components/ui";

const addressSchema = z.object({
  name: z.string().min(1, "Recipient name is required").min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number (e.g. +18005550199)"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^\d{5,6}$/, "Postal code must be 5 or 6 digits"),
  country: z.string().min(1, "Country is required"),
  isDefault: z.boolean().optional(),
});

export const AddressesPage = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAddresses);

  const [isOpen, setIsOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      isDefault: false
    },
  });

  const handleOpenAdd = () => {
    setEditingAddress(null);
    reset({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      isDefault: false
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingAddress(addr);
    reset({
      name: addr.name,
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country,
      isDefault: addr.isDefault
    });
    setIsOpen(true);
  };

  const onSubmit = (data) => {
    if (editingAddress) {
      dispatch(updateAddress({ ...data, id: editingAddress.id }));
      toast.success("Saved address updated successfully.");
    } else {
      dispatch(addAddress(data));
      toast.success("Saved address added successfully.");
    }
    setIsOpen(false);
  };

  const handleDelete = (id, isDefault) => {
    if (isDefault && addresses.length > 1) {
      toast.error("Set another address as default before deleting this one.");
      return;
    }
    dispatch(deleteAddress(id));
    toast.success("Saved address removed.");
  };

  const handleSetDefault = (id) => {
    dispatch(setDefaultAddress(id));
    toast.success("Default address updated.");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header section with add button */}
      <div className="flex items-center justify-between pl-1 select-none">
        <h3 className="text-sm font-black text-text-primary uppercase tracking-wider">
          Saved Delivery Coordinates
        </h3>
        <Button 
          onClick={handleOpenAdd} 
          size="sm" 
          className="h-9 px-4 text-[10px] gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>ADD ADDRESS</span>
        </Button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {addresses.map((addr) => (
          <Card 
            key={addr.id} 
            className={`p-6 border bg-surface flex flex-col justify-between gap-5 transition-all shadow-sm ${
              addr.isDefault 
                ? "border-primary/45 shadow-md bg-primary-light/5" 
                : "border-border/30 hover:shadow-md"
            }`}
          >
            <div className="flex gap-4 items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                addr.isDefault ? "bg-primary text-white" : "bg-primary-light text-primary"
              }`}>
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-black text-text-primary">{addr.name}</span>
                  {addr.isDefault && (
                    <Badge variant="primary" className="h-4 flex items-center text-[8px] tracking-widest leading-none">
                      DEFAULT
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-text-secondary mt-1.5 leading-relaxed font-medium">
                  {addr.street}, {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                </span>
                <span className="text-[10px] text-text-muted font-mono">{addr.phone}</span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-3.5 border-t border-border-light/80 text-2xs font-extrabold select-none">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(addr)}
                  className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(addr.id, addr.isDefault)}
                  className="flex items-center gap-1.5 text-text-secondary hover:text-error transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              {!addr.isDefault && (
                <button
                  type="button"
                  onClick={() => handleSetDefault(addr.id)}
                  className="flex items-center gap-1 text-primary hover:underline cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Set as Default</span>
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal form for Add/Edit Address */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 select-none">
          <div className="pb-2 border-b border-border-light/80">
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight">
              {editingAddress ? "Modify Delivery Coordinates" : "Add Delivery Coordinates"}
            </h3>
            <p className="text-[10px] text-text-muted mt-1 leading-normal">
              Supply address specifications to ensure safe and prompt handover valets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Recipient Name"
              placeholder="e.g. John Doe"
              prefix={<User className="w-4 h-4 text-text-muted" />}
              error={errors.name?.message}
              autocomplete="name"
              {...register("name")}
            />

            <Input
              label="Phone Number"
              placeholder="e.g. +18005550199"
              prefix={<Phone className="w-4 h-4 text-text-muted" />}
              error={errors.phone?.message}
              autocomplete="tel"
              {...register("phone")}
            />

            <div className="sm:col-span-2">
              <Input
                label="Street Address"
                placeholder="e.g. 5th Avenue, Apt 4B"
                prefix={<Home className="w-4 h-4 text-text-muted" />}
                error={errors.street?.message}
                autocomplete="street-address"
                {...register("street")}
              />
            </div>

            <Input
              label="City"
              placeholder="e.g. New York"
              prefix={<Locate className="w-4 h-4 text-text-muted" />}
              error={errors.city?.message}
              autocomplete="address-level2"
              {...register("city")}
            />

            <Input
              label="State"
              placeholder="e.g. NY"
              prefix={<Locate className="w-4 h-4 text-text-muted" />}
              error={errors.state?.message}
              autocomplete="address-level1"
              {...register("state")}
            />

            <Input
              label="Postal Code"
              placeholder="e.g. 10001"
              prefix={<Bookmark className="w-4 h-4 text-text-muted" />}
              error={errors.postalCode?.message}
              autocomplete="postal-code"
              {...register("postalCode")}
            />

            <Input
              label="Country"
              placeholder="e.g. United States"
              prefix={<Globe className="w-4 h-4 text-text-muted" />}
              error={errors.country?.message}
              autocomplete="country-name"
              {...register("country")}
            />

            <div className="sm:col-span-2 flex items-center gap-2.5 mt-1 select-none">
              <input
                type="checkbox"
                id="isDefault"
                className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                {...register("isDefault")}
              />
              <label 
                htmlFor="isDefault" 
                className="text-xs font-semibold text-text-secondary select-none cursor-pointer"
              >
                Set this address as default coordinate
              </label>
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 h-9 text-[10px]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="px-5 py-2 h-9 text-[10px]"
            >
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddressesPage;
