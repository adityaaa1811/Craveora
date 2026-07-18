import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { User, Mail, Phone, Calendar, Check, Key } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCurrentUser, setUser } from "../store/slices/authSlice";
import { selectUserProfile, updateProfile } from "../store/slices/profileSlice";
import { Card, Input, Button, Avatar, Modal } from "../components/ui";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number (e.g. +18005550199)"),
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  dob: z.string().min(1, "Date of birth is required"),
});

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const userProfile = useAppSelector(selectUserProfile);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Split name for form input fields
  const [initialFirstName, initialLastName] = (currentUser?.name || "Aditya Mishra").split(" ");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialFirstName || "",
      lastName: initialLastName || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      dob: userProfile.dob || ""
    },
  });

  const onSubmit = (data) => {
    // Update store values
    const updatedUser = {
      ...currentUser,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone
    };
    dispatch(setUser(updatedUser));
    dispatch(updateProfile({ dob: data.dob }));
    
    toast.success("Profile updated successfully.");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsChangingPassword(false);
    toast.success("Password reset invitation sent to your email.");
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 md:p-8 border border-border/30 bg-surface shadow-sm">
        
        {/* Header section with interactive Avatar upload preview */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-border-light pb-6 mb-8 select-none">
          <div className="relative group cursor-pointer">
            <Avatar name={currentUser?.name || "User"} size="lg" />
            <div className="absolute inset-0 bg-overlay/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-black text-white uppercase tracking-wider text-center px-1">
                Edit Photo
              </span>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-extrabold text-text-primary">
              Profile Customization
            </h3>
            <p className="text-[11px] text-text-muted mt-1 leading-normal max-w-xs">
              Upload a high-resolution photo. Valid formats: JPEG, PNG. Max size 2MB.
            </p>
          </div>
        </div>

        {/* Profile Inputs Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="First Name"
              placeholder="e.g. John"
              prefix={<User className="w-4 h-4 text-text-muted" />}
              error={errors.firstName?.message}
              autocomplete="given-name"
              {...register("firstName")}
            />

            <Input
              label="Last Name"
              placeholder="e.g. Doe"
              prefix={<User className="w-4 h-4 text-text-muted" />}
              error={errors.lastName?.message}
              autocomplete="family-name"
              {...register("lastName")}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. john@example.com"
              prefix={<Mail className="w-4 h-4 text-text-muted" />}
              error={errors.email?.message}
              autocomplete="email"
              {...register("email")}
            />

            <Input
              label="Phone Number"
              placeholder="e.g. +18005550199"
              prefix={<Phone className="w-4 h-4 text-text-muted" />}
              error={errors.phone?.message}
              autocomplete="tel"
              {...register("phone")}
            />

            <Input
              label="Date of Birth"
              type="date"
              prefix={<Calendar className="w-4 h-4 text-text-muted" />}
              error={errors.dob?.message}
              {...register("dob")}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 pt-4 border-t border-border-light">
            <Button type="submit" className="px-6 h-11 text-xs tracking-wider">
              <Check className="w-4 h-4" />
              <span>SAVE CHANGES</span>
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsChangingPassword(true)}
              className="px-6 h-11 text-xs tracking-wider"
            >
              <Key className="w-4 h-4" />
              <span>CHANGE PASSWORD</span>
            </Button>
          </div>
        </form>
      </Card>

      {/* Password Reset Modal Dialog */}
      <Modal isOpen={isChangingPassword} onClose={() => setIsChangingPassword(false)}>
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 p-4 select-none">
          <div className="pb-2 border-b border-border-light/80">
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight">
              Password Restructure
            </h3>
            <p className="text-[10px] text-text-muted mt-1 leading-normal">
              Confirm your email address below to receive a secure credentials reset token.
            </p>
          </div>
          <Input
            label="Email Address"
            type="email"
            value={currentUser?.email || ""}
            disabled
            prefix={<Mail className="w-4 h-4 text-text-muted" />}
          />
          <div className="flex gap-3 justify-end mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsChangingPassword(false)}
              className="px-4 py-2 h-9 text-[10px]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="px-5 py-2 h-9 text-[10px]"
            >
              Confirm
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
