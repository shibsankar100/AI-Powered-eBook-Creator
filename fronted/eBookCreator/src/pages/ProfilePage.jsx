import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
    User,
    Mail,
    ShieldCheck,
    Save,
    Sparkles,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashBoardLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axioinstance";
import { API_PATHS } from "../utils/apiPaths";

const ProfilePage = () => {
    const {
        user,
        updateUser,
        loading: authLoading,
    } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = formData.name.trim();

        if (!name) {
            toast.error("Name is required");
            return;
        }

        if (isLoading) return;

        setIsLoading(true);

        try {
            const response = await axiosInstance.put(
                API_PATHS.AUTH.UPDATE_PROFILE,
                {
                    name,
                }
            );

            updateUser(response.data);

            toast.success(
                "Profile updated successfully!"
            );
        } catch (error) {
            console.error(
                "Profile update error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) {
        return (
            <DashboardLayout activeMenu="profile">
                <div className="flex min-h-[50vh] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />

                        <p className="text-sm font-medium text-slate-500">
                            Loading profile...
                        </p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout activeMenu="profile">

            <style>{`
                @keyframes profileFade {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes profileScale {
                    from {
                        opacity: 0;
                        transform: scale(.98);
                    }

                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .profile-fade {
                    animation:
                        profileFade
                        .45s
                        cubic-bezier(.22,1,.36,1)
                        both;
                }

                .profile-card {
                    animation:
                        profileScale
                        .4s
                        cubic-bezier(.22,1,.36,1)
                        both;
                }

                .profile-avatar {
                    transition:
                        transform .25s ease,
                        box-shadow .25s ease;
                }

                .profile-avatar:hover {
                    transform: translateY(-2px) scale(1.03);
                    box-shadow:
                        0 12px 30px
                        rgba(124,58,237,.22);
                }

                .profile-save {
                    transition:
                        transform .2s ease,
                        box-shadow .2s ease;
                }

                .profile-save:hover {
                    transform: translateY(-1px);
                }

                .profile-save:active {
                    transform: scale(.98);
                }

                @media (prefers-reduced-motion: reduce) {
                    .profile-fade,
                    .profile-card,
                    .profile-avatar {
                        animation: none !important;
                        transition: none !important;
                    }
                }
            `}</style>

            <div className="profile-fade mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 lg:px-8">

                <div className="mb-5">

                    <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <User size={17} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900">
                                Profile
                            </h1>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Manage your account details
                            </p>
                        </div>

                    </div>

                </div>

                <div className="grid gap-5 lg:grid-cols-[280px_1fr]">

                    <div className="profile-card h-fit rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,.06)]">

                        <div className="flex flex-col items-center text-center">

                            <div className="profile-avatar relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-2xl font-black text-white shadow-lg shadow-violet-500/20">

                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={
                                            user?.name ||
                                            "User"
                                        }
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    user?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() ||
                                    "U"
                                )}

                            </div>

                            <h2 className="mt-3 text-base font-black text-slate-900">
                                {user?.name || "User"}
                            </h2>

                            <p className="mt-1 max-w-full truncate text-xs text-slate-400">
                                {user?.email || ""}
                            </p>

                        </div>

                        <div className="my-5 h-px bg-slate-100" />

                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">

                            <div className="flex items-center gap-2.5">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">

                                    <ShieldCheck size={15} />

                                </div>

                                <div>

                                    <p className="text-xs font-black text-slate-700">
                                        Account active
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                        Your account is secure
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="mt-2.5 rounded-xl border border-violet-100 bg-violet-50/60 p-3">

                            <div className="flex items-center gap-2.5">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">

                                    <Sparkles size={15} />

                                </div>

                                <div>

                                    <p className="text-xs font-black text-slate-700">
                                        AI Creator
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                        Create better books
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="profile-card rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,.06)]">

                        <div className="h-1 rounded-t-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

                        <div className="p-5 sm:p-6">

                            <div className="mb-5">

                                <h2 className="text-base font-black text-slate-900">
                                    Personal information
                                </h2>

                                <p className="mt-1 text-xs text-slate-400">
                                    Update your basic account information.
                                </p>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >

                                <div>

                                    <InputField
                                        label="Full Name"
                                        name="name"
                                        type="text"
                                        icon={User}
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                        autoComplete="name"
                                    />

                                </div>

                                <div>

                                    <InputField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        icon={Mail}
                                        value={
                                            formData.email
                                        }
                                        disabled
                                        autoComplete="email"
                                    />

                                    <p className="mt-1.5 text-[10px] text-slate-400">
                                        Email address cannot
                                        be changed here.
                                    </p>

                                </div>

                                <div className="h-px bg-slate-100" />

                                <div className="flex justify-end">

                                    <Button
                                        type="submit"
                                        isLoading={isLoading}
                                        className="profile-save flex items-center gap-2 !rounded-xl !px-5 !py-2.5 !text-xs !font-bold shadow-md shadow-violet-500/15"
                                    >

                                        {!isLoading && (
                                            <Save size={14} />
                                        )}

                                        {isLoading
                                            ? "Saving..."
                                            : "Save Changes"}

                                    </Button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
};

export default ProfilePage;