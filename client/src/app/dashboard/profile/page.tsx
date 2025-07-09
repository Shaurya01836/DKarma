"use client"

import { useState, useEffect, useRef } from "react"
import {
  User,
  Github,
  Linkedin,
  Globe,
  Trash2,
  Plus,
  X,
  Star,
  Eye,
  EyeOff,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Award,
  Briefcase,
  Settings,
  Shield,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/hooks/useUser"
import { useAuth } from "@/context/AuthContext"
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { UserService } from '@/services/userService'
import Image from 'next/image'
import { useUserType } from "@/context/UserTypeContext";

const workingDaysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const predefinedSkills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "Java", "C++", "C#", "Go", "Rust",
  "Solidity", "Web3", "Ethereum", "Bitcoin", "Blockchain", "Smart Contracts", "DeFi", "NFT", "DApp",
  "HTML", "CSS", "Sass", "Tailwind CSS", "Bootstrap", "Material-UI", "Ant Design", "Chakra UI",
  "Vue.js", "Angular", "Svelte", "Nuxt.js", "Gatsby", "Express.js", "FastAPI", "Django", "Flask",
  "PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "Supabase", "AWS", "Azure", "Google Cloud",
  "Docker", "Kubernetes", "Git", "GitHub", "GitLab", "CI/CD", "Jenkins", "Travis CI", "GitHub Actions",
  "REST API", "GraphQL", "gRPC", "WebSocket", "Socket.io", "JWT", "OAuth", "OpenID Connect",
  "Machine Learning", "AI", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib",
  "Data Science", "Big Data", "Hadoop", "Spark", "Kafka", "Elasticsearch", "Logstash", "Kibana",
  "Mobile Development", "React Native", "Flutter", "Swift", "Kotlin", "Xamarin", "Ionic",
  "Game Development", "Unity", "Unreal Engine", "Godot", "Cocos2d", "Phaser", "Three.js",
  "UI/UX Design", "Figma", "Adobe XD", "Sketch", "InVision", "Framer", "Webflow",
  "DevOps", "Linux", "Ubuntu", "CentOS", "Nginx", "Apache", "Load Balancing", "Microservices",
  "Cybersecurity", "Penetration Testing", "Ethical Hacking", "Network Security", "Cryptography",
  "IoT", "Arduino", "Raspberry Pi", "ESP32", "MQTT", "CoAP", "LoRa", "Zigbee",
  "AR/VR", "Unity VR", "Unreal VR", "WebXR", "A-Frame", "Three.js VR", "Oculus", "HTC Vive",
  "Testing", "Jest", "Cypress", "Selenium", "Playwright", "Mocha", "Chai", "JUnit", "PyTest",
  "Agile", "Scrum", "Kanban", "Jira", "Confluence", "Trello", "Asana", "Notion",
  "Product Management", "Project Management", "Business Analysis", "Requirements Gathering",
  "Digital Marketing", "SEO", "SEM", "Google Analytics", "Facebook Ads", "Google Ads", "Content Marketing"
];

type PartialPortfolioItem = Partial<{
  id: string | number;
  title: string;
  description: string;
  tech: string[];
  tags: string[];
  link: string;
  demo: string;
  github: string;
  year: string;
  image: string;
}>;
function normalizePortfolioItem(item: PartialPortfolioItem) {
  return {
    id: item.id !== undefined && item.id !== null ? String(item.id) : '',
    title: item.title ?? '',
    description: item.description ?? '',
    tech: Array.isArray(item.tech) ? item.tech : [],
    tags: Array.isArray(item.tags) ? item.tags : [],
    link: typeof item.link === 'string' ? item.link : '',
    demo: typeof item.demo === 'string' ? item.demo : '',
    github: typeof item.github === 'string' ? item.github : '',
    year: typeof item.year === 'string' ? item.year : '',
    image: typeof item.image === 'string' ? item.image : '',
  };
}

export default function FreelancerProfile() {
  const { profile, loading: profileLoading, updateUserProfile } = useUser();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { userType, setUserType } = useUserType();
  const [switching, setSwitching] = useState(false);
  const [switchSuccess, setSwitchSuccess] = useState(false);

  const initialName = profile?.displayName || user?.displayName || '';
  const initialEmail = profile?.email || user?.email || '';

  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [bio, setBio] = useState(profile?.bio || '');
  const [organization, setOrganization] = useState(profile?.organization || '');
  const [role, setRole] = useState(profile?.role || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [username, setUsername] = useState(profile?.username || '');
  const [saving, setSaving] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(profile?.skills || ["React", "Web3", "Solidity", "TypeScript"])
  const [showSkillInput, setShowSkillInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [newSkill, setNewSkill] = useState('');
  const filteredSkills = predefinedSkills.filter(skill =>
    skill.toLowerCase().includes(newSkill.toLowerCase()) && !selectedSkills.includes(skill)
  );
  const [experience, setExperience] = useState(profile?.experience || '');
  const [editingBio, setEditingBio] = useState(false);

  const [workHistory, setWorkHistory] = useState<{ id: string | number; title: string; organization: string; payment: string; rating: number; date: string }[]>(profile?.workHistory || []);
  const [portfolio, setPortfolio] = useState<{ id: string; title: string; description: string; tech: string[]; tags: string[]; link: string; demo: string; github: string; year: string; image: string }[]>(
    (profile?.portfolio || []).map(normalizePortfolioItem)
  );
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '',
    tags: '',
    link: '',
    demo: '',
    github: '',
    year: '',
    image: '',
  });

  const [github, setGithub] = useState(profile?.github || '');
  const [linkedin, setLinkedin] = useState(profile?.linkedin || '');
  const [website, setWebsite] = useState(profile?.website || '');

  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [viewProject, setViewProject] = useState<{ id: string | number; title: string; description: string; tech: string[]; tags: string[]; link: string; demo: string; github: string; year: string; image: string } | null>(null);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const providerId = user?.providerData?.[0]?.providerId;

  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [domain, setDomain] = useState(profile?.domain || '');
  const [hourlyRate, setHourlyRate] = useState(profile?.hourlyRate || '');
  const [workingDays, setWorkingDays] = useState<string[]>(profile?.workingDays || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingRole, setEditingRole] = useState(false);

  useEffect(() => {
    setFullName(profile?.displayName || user?.displayName || '');
    setEmail(profile?.email || user?.email || '');
    setBio(profile?.bio || '');
    setOrganization(profile?.organization || '');
    setRole(profile?.role || '');
    setLocation(profile?.location || '');
    setPhone(profile?.phone || '');
    setUsername(profile?.username || '');
    setExperience(profile?.experience || '');
    setDomain(profile?.domain || '');
    setHourlyRate(profile?.hourlyRate || '');
    setIsAvailable(profile?.available ?? true);
    setWorkingDays(profile?.workingDays || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    setSelectedSkills(profile?.skills || []);
    setWorkHistory(profile?.workHistory || []);
    setPortfolio((profile?.portfolio || []).map(item => normalizePortfolioItem({ ...item, id: String(item.id) })));
    setGithub(profile?.github || '');
    setLinkedin(profile?.linkedin || '');
    setWebsite(profile?.website || '');
  }, [profile, user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile({
        displayName: fullName,
        email,
        bio,
        organization,
        role,
        location,
        phone,
        username,
        experience: experience || '',
        domain,
        hourlyRate,
        available: isAvailable,
        workingDays,
        skills: selectedSkills,
        github,
        linkedin,
        website,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch {
      alert('Error saving profile!');
    } finally {
      setSaving(false);
    }
  };

  const addCustomSkill = () => {
    if (newSkill.trim() && !selectedSkills.includes(newSkill.trim())) {
      setSelectedSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
      setShowSkillInput(false);
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  }

  const totalEarned = profile?.totalEarned ?? 0;
  const projectsDone = profile?.projectsDone ?? 0;
  const averageRating = profile?.averageRating ?? null;
  const hourlyRateStat = profile?.hourlyRate ?? 0;

  const savePortfolio = async (updatedPortfolio: { id: string; title: string; description: string; tech: string[]; tags: string[]; link: string; demo: string; github: string; year: string; image: string }[]) => {
    const normalized = updatedPortfolio.map(item => ({ ...item, id: String(item.id) }));
    setPortfolio(normalized);
    await updateUserProfile({ portfolio: normalized });
  };

  const handleAddProject = async () => {
    if (!newProject.title.trim()) return;
    let imageUrl = '';
    if (projectImageUrl && (projectImageUrl.startsWith('http://') || projectImageUrl.startsWith('https://'))) {
      imageUrl = projectImageUrl;
    } else if (newProject.image && typeof newProject.image === 'string' && (newProject.image.startsWith('http://') || newProject.image.startsWith('https://'))) {
      imageUrl = newProject.image;
    }
    const project = {
      ...newProject,
      tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean),
      tech: newProject.tech.split(',').map(t => t.trim()).filter(Boolean),
      id: String(isEditingProject && editingProjectIndex !== null ? portfolio[editingProjectIndex].id : Date.now()),
      image: imageUrl,
    };
    let updated;
    if (isEditingProject && editingProjectIndex !== null) {
      updated = [...portfolio];
      updated[editingProjectIndex] = project;
    } else {
      updated = [...portfolio, project];
    }
    await savePortfolio(updated);
    setShowProjectForm(false);
    setIsEditingProject(false);
    setEditingProjectIndex(null);
    setNewProject({ title: '', description: '', tech: '', tags: '', link: '', demo: '', github: '', year: '', image: '' });
    setProjectImageUrl('');
  };

  const handleDeleteProject = async (id: string) => {
    const updated = portfolio.filter(p => p.id !== id);
    await savePortfolio(updated);
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('All fields are required.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    setChangingPassword(true);
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) throw new Error('No user.');
      const cred = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, cred);
      await updatePassword(currentUser, newPassword);
      setPasswordSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: unknown) {
      if ((err as { code?: string }).code === 'auth/invalid-credential' || (err as { code?: string }).code === 'auth/wrong-password') {
        setPasswordError('Your current password is incorrect.');
      } else {
        setPasswordError((err as Error).message || 'Failed to change password.');
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError('');
    setDeletingAccount(true);
    try {
      if (!user) throw new Error('No user.');
      await UserService.updateUserProfile(user.uid, { deleted: true });
      await deleteUser(user);
      setShowDeleteConfirm(false);
      router.push('/auth/login');
    } catch (err: unknown) {
      setDeleteError((err as Error).message || 'Failed to delete account.');
    } finally {
      setDeletingAccount(false);
    }
  };

  if (profileLoading || authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Switch Role Button for Clients and Freelancers */}
      {(userType === 'client' || userType === 'freelancer') && (
        <div className="flex justify-end max-w-7xl mx-auto px-6 pt-8">
          {userType === 'client' && (
            <Button
              onClick={async () => {
                setSwitching(true);
                setUserType('freelancer');
                localStorage.setItem('userType', 'freelancer');
                setSwitchSuccess(true);
                setTimeout(() => {
                  setSwitching(false);
                  setSwitchSuccess(false);
                  window.location.reload();
                }, 1200);
              }}
              disabled={switching}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              {switching ? 'Switching...' : 'Switch to Freelancer'}
            </Button>
          )}
          {userType === 'freelancer' && (
            <Button
              onClick={async () => {
                setSwitching(true);
                setUserType('client');
                localStorage.setItem('userType', 'client');
                setSwitchSuccess(true);
                setTimeout(() => {
                  setSwitching(false);
                  setSwitchSuccess(false);
                  window.location.reload();
                }, 1200);
              }}
              disabled={switching}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              {switching ? 'Switching...' : 'Switch to Client'}
            </Button>
          )}
          {switchSuccess && (
            <span className="ml-4 text-[var(--color-success)] font-medium">Switched! Reloading...</span>
          )}
        </div>
      )}
      {/* Animated background sparkles */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20 animate-pulse bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--color-primary)] via-transparent to-transparent" />
      
      {/* Hero Profile Section */}
      <div className="relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center space-y-8">
            {/* Profile Avatar & Status */}
            <div className="relative inline-block">
              <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
                <AvatarImage src={profile?.photoURL || "/default-avatar.png"} />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-4xl">
                  {fullName
                    ? fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                    : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2">
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-4">
               <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {fullName}
              </h1>
              <div className="flex items-center justify-center gap-2">
                {editingRole ? (
                  <input
                    type="text"
                    value={role}
                    autoFocus
                    onChange={e => setRole(e.target.value)}
                    onBlur={async () => {
                      setEditingRole(false);
                      if (role !== (profile?.role || '')) {
                        setSaving(true);
                        try {
                          await updateUserProfile({ role });
                          setShowSuccess(true);
                          setTimeout(() => setShowSuccess(false), 2000);
                        } catch {}
                        setSaving(false);
                      }
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter') {
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    style={{
                      background: '#2563eb22',
                      color: '#60a5fa',
                      border: '1px solid #3b82f6',
                      borderRadius: '9999px',
                      padding: '0.5rem 1.25rem',
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      outline: 'none',
                      minWidth: 120,
                      textAlign: 'center',
                      marginRight: 8,
                    }}
                    placeholder="Your Tech Role (e.g. Web3 Developer)"
                  />
                ) : (
                  <Badge
                    className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/30 px-4 py-2 text-lg"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setEditingRole(true)}
                    title="Click to edit"
                  >
                    {role || "Your Tech Role (e.g. Web3 Developer)"}
                  </Badge>
                )}
                <Badge
                   className={`px-4 py-2 text-lg ${isAvailable ? "bg-green-600/20 text-green-400 border-green-500/30" : "bg-gray-600/20 text-gray-400 border-gray-500/30"}`}
                >
                  {isAvailable ? "Available" : "Busy"}
                </Badge>
              </div>
              {editingBio ? (
                                  <textarea
                    value={bio}
                    autoFocus
                    onChange={e => setBio(e.target.value)}
                    onBlur={async () => {
                      setEditingBio(false);
                      if (bio !== (profile?.bio || '')) {
                        setSaving(true);
                        try {
                          await updateUserProfile({ bio });
                          setShowSuccess(true);
                          setTimeout(() => setShowSuccess(false), 2000);
                        } catch {}
                        setSaving(false);
                      }
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        (e.target as HTMLTextAreaElement).blur();
                      }
                    }}
                    placeholder="Add a short bio about yourself."
                    className="w-full text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed bg-transparent border-none outline-none resize-none"
                    rows={2}
                  />
                ) : (
                  <p
                    className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed cursor-pointer"
                    onClick={() => setEditingBio(true)}
                    title="Click to edit"
                  >
                    {bio || "Add a short bio about yourself."}
                  </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-emerald-400">₹{totalEarned}</div>
                <div className="text-gray-400">Total Earned</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-blue-400">{projectsDone}</div>
                <div className="text-gray-400">Projects Done</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-amber-400 flex items-center gap-1">
                  {averageRating !== null && averageRating > 0 ? averageRating.toFixed(1) : '-'} <Star className="w-6 h-6 fill-amber-400" />
                </div>
                <div className="text-gray-400">Average Rating</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-purple-400">₹{hourlyRateStat}</div>
                <div className="text-gray-400">Hourly Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/5 border border-white/10 rounded-2xl p-1 mb-8">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="work"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Work
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <Award className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Payment
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-xl"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Full Name</label>
                      <Input
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Full Name"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Username</label>
                      <Input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </label>
                      <Input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Phone"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </label>
                      <Input
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        placeholder="Location"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="bg-white/5 border-white/20 text-white focus:border-blue-500">
                        <Github className="w-4 h-4" />
                        GitHub
                      </label>
                      <Input
                        value={github}
                        onChange={e => setGithub(e.target.value)}
                        placeholder="github.com/username"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </label>
                      <Input
                        value={linkedin}
                        onChange={e => setLinkedin(e.target.value)}
                        placeholder="linkedin.com/in/username"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Website
                      </label>
                      <Input
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                        placeholder="yourwebsite.com"
                        className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Details */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Professional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Bio</label>
                    <Textarea
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="bg-white/5 border-white/20 text-white focus:border-blue-500 min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Skills</label>
                    
                    {/* Selected Skills Display */}
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>

                    {/* Skills Selection */}
                    <div className="space-y-3">
                      {/* Predefined Skills Dropdown */}
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400">Choose from predefined skills:</label>
                        <div className="relative w-full">
                          <Input
                            type="text"
                            placeholder="Search or select a skill..."
                            className="bg-white/5 border-white/20 text-white focus:border-blue-500 text-sm flex-1"
                            value={newSkill}
                            onChange={e => setNewSkill(e.target.value)}
                            onFocus={() => setShowSkillInput(true)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                // If dropdown is open and a skill is highlighted, select it
                                if (filteredSkills.length > 0 && highlightedIndex >= 0) {
                                  const skill = filteredSkills[highlightedIndex];
                                  if (!selectedSkills.includes(skill)) {
                                    setSelectedSkills(prev => [...prev, skill]);
                                    setNewSkill('');
                                    setShowSkillInput(false);
                                  }
                                } else {
                                  addCustomSkill();
                                }
                              } else if (e.key === 'ArrowDown') {
                                setHighlightedIndex(i => Math.min(i + 1, filteredSkills.length - 1));
                              } else if (e.key === 'ArrowUp') {
                                setHighlightedIndex(i => Math.max(i - 1, 0));
                              } else if (e.key === 'Escape') {
                                setShowSkillInput(false);
                                setNewSkill('');
                              }
                            }}
                            autoComplete="off"
                            ref={inputRef}
                          />
                          {showSkillInput && filteredSkills.length > 0 && (
                            <div className="absolute z-10 w-full bg-[#18181b] border border-blue-700 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                              {filteredSkills.map((skill, idx) => (
                                <div
                                  key={skill}
                                  className={`px-4 py-2 cursor-pointer text-sm ${highlightedIndex === idx ? 'bg-blue-700 text-white' : 'text-gray-200 hover:bg-blue-800'}`}
                                  onMouseDown={() => {
                                    if (!selectedSkills.includes(skill)) {
                                      setSelectedSkills(prev => [...prev, skill]);
                                      setNewSkill('');
                                      setShowSkillInput(false);
                                    }
                                  }}
                                  onMouseEnter={() => setHighlightedIndex(idx)}
                                >
                                  {skill}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2 mt-2">
                        <label className="text-xs text-gray-400">Or add a custom skill:</label>
                        <div className="flex gap-2 items-center w-full">
                          <Input
                            value={newSkill}
                            onChange={e => setNewSkill(e.target.value)}
                            placeholder="Enter custom skill..."
                            className="bg-white/5 border-white/20 text-white focus:border-blue-500 text-sm flex-1"
                            onKeyDown={e => {
                              if (e.key === 'Enter') addCustomSkill();
                              else if (e.key === 'Escape') {
                                setShowSkillInput(false);
                                setNewSkill('');
                              }
                            }}
                            autoFocus={showSkillInput}
                          />
                          <Button
                            onClick={addCustomSkill}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm rounded-md"
                            disabled={!newSkill.trim()}
                            type="button"
                          >
                            Add
                          </Button>
                          <Button
                            onClick={() => {
                              setShowSkillInput(false);
                              setNewSkill('');
                            }}
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 px-3 py-2 text-sm rounded-md"
                            type="button"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Experience</label>
                      <select
                        style={{ background: '#18181b', color: '#fff', border: '1px solid #3b82f6' }}
                        className="w-full p-2 bg-white/10 border border-white/30 rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={experience}
                        onChange={e => setExperience(e.target.value)}
                      >
                        <option style={{ background: '#18181b', color: '#fff' }} value="">Select experience</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="0-1">0-1 years</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="1-2">1-2 years</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="2-5">2-5 years</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="5-10">5-10 years</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="10+">10+ years</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Domain</label>
                      <select
                        style={{ background: '#18181b', color: '#fff', border: '1px solid #3b82f6' }}
                        className="w-full p-2 bg-white/10 border border-white/30 rounded-lg text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={domain}
                        onChange={e => setDomain(e.target.value)}
                      >
                        <option style={{ background: '#18181b', color: '#fff' }} value="">Select domain</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="web3">Web3 & Blockchain</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="frontend">Frontend Development</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="fullstack">Full Stack Development</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="backend">Backend Development</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="mobile">Mobile Development</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="devops">DevOps</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="ai">Artificial Intelligence</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="ml">Machine Learning</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="data">Data Science</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="cloud">Cloud Computing</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="security">Cybersecurity</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="uiux">UI/UX Design</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="qa">Quality Assurance</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="iot">IoT</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="game">Game Development</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="arvr">AR/VR</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="product">Product Management</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="project">Project Management</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="marketing">Digital Marketing</option>
                        <option style={{ background: '#18181b', color: '#fff' }} value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Availability */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Availability & Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Available for Work</span>
                      <Switch
                        checked={isAvailable}
                        onCheckedChange={setIsAvailable}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Hourly Rate</label>
                      <div className="relative">
                        <Input
                          value={hourlyRate}
                          onChange={e => setHourlyRate(e.target.value)}
                          placeholder="Hourly Rate"
                          className="bg-white/5 border-white/20 text-white focus:border-blue-500 pl-8"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-3 block">Working Days</label>
                    {workingDaysList && (
                      <div className="flex flex-wrap gap-2">
                        {workingDaysList.map((day) => (
                          <Badge
                            key={day}
                            variant={workingDays.includes(day) ? "default" : "outline"}
                            className={`cursor-pointer ${
                              workingDays.includes(day)
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "border-white/20 text-gray-300 hover:bg-white/10"
                            }`}
                            onClick={() => {
                              setWorkingDays((prev) =>
                                prev.includes(day)
                                  ? prev.filter((d) => d !== day)
                                  : [...prev, day]
                              );
                            }}
                          >
                            {day}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button onClick={handleSave} disabled={saving} className="mt-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-2xl rounded-xl px-6 py-3">
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </TabsContent>

          {/* Work Tab */}
          <TabsContent value="work" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">Work History</CardTitle>
              </CardHeader>
              <CardContent>
                {workHistory.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No work history yet.</div>
                ) : (
                  workHistory.map((job) => (
                    <div key={job.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                          <p className="text-gray-400">{job.organization}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">{job.payment}</div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < job.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                              />
                            ))}
                          </div>
                          <div className="text-gray-500 text-sm">{job.date}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-white">Portfolio Projects</CardTitle>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent" onClick={() => {
                  setShowProjectForm(true);
                  setIsEditingProject(false);
                  setEditingProjectIndex(null);
                  setNewProject({ title: '', description: '', tech: '', tags: '', link: '', demo: '', github: '', year: '', image: '' });
                  setProjectImageUrl('');
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent>
                {portfolio.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No portfolio projects yet.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolio.map((project) => (
                      <div key={project.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                            {project.year && <div className="text-xs text-gray-400">{project.year}</div>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="text-blue-400 border-blue-700 hover:bg-blue-900" onClick={() => setViewProject(project)}>
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="text-yellow-400 border-yellow-700 hover:bg-yellow-900" onClick={() => {
                              setShowProjectForm(true);
                              setIsEditingProject(true);
                              setEditingProjectIndex(portfolio.findIndex(p => p.id === project.id));
                              setNewProject({
                                ...project,
                                tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech || '',
                                tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags || '',
                              });
                              setProjectImageUrl(project.image || '');
                            }}>
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600" onClick={() => handleDeleteProject(project.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3 text-sm line-clamp-3">{project.description}</p>
                        {project.tech && project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.tech.map((tech: string) => (
                              <Badge key={tech} className="bg-blue-700 text-white text-xs">{tech}</Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tags && project.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {project.link && <div className="text-blue-400 text-sm break-all"><a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></div>}
                      </div>
                    ))}
                  </div>
                )}
                {showProjectForm && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-xl border border-white/10 shadow-2xl relative">
                      <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={() => setShowProjectForm(false)}>
                        <X className="w-5 h-5" />
                      </button>
                      <h2 className="text-2xl font-bold mb-4 text-white">{isEditingProject ? 'Edit Portfolio Project' : 'Add Portfolio Project'}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4 col-span-1">
                          <Input
                            value={newProject.title}
                            onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                            placeholder="Project Title"
                            className="bg-white/5 border-white/20 text-white"
                          />
                          <Input
                            value={newProject.year}
                            onChange={e => setNewProject({ ...newProject, year: e.target.value })}
                            placeholder="Year (e.g. 2024)"
                            className="bg-white/5 border-white/20 text-white"
                          />
                          <Input
                            value={newProject.tech}
                            onChange={e => setNewProject({ ...newProject, tech: e.target.value })}
                            placeholder="Tech Stack (comma separated)"
                            className="bg-white/5 border-white/20 text-white"
                          />
                          <Input
                            value={newProject.tags}
                            onChange={e => setNewProject({ ...newProject, tags: e.target.value })}
                            placeholder="Tags (comma separated)"
                            className="bg-white/5 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-4 col-span-1">
                          <Textarea
                            value={newProject.description}
                            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                            placeholder="Project Description"
                            className="bg-white/5 border-white/20 text-white min-h-[100px]"
                          />
                          <Input
                            value={newProject.link}
                            onChange={e => setNewProject({ ...newProject, link: e.target.value })}
                            placeholder="Project Link (URL)"
                            className="bg-white/5 border-white/20 text-white"
                          />
                          <Input
                            value={newProject.demo}
                            onChange={e => setNewProject({ ...newProject, demo: e.target.value })}
                            placeholder="Demo Link (optional)"
                            className="bg-white/5 border-white/20 text-white"
                          />
                          <Input
                            value={newProject.github}
                            onChange={e => setNewProject({ ...newProject, github: e.target.value })}
                            placeholder="GitHub/Repo Link (optional)"
                            className="bg-white/5 border-white/20 text-white"
                          />
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Project Image (optional)</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => {
                                const file = e.target.files?.[0] || null;
                                setProjectImageUrl(file ? URL.createObjectURL(file) : '');
                              }}
                              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {projectImageUrl && (
                              <Image src={projectImageUrl} alt="Preview" width={100} height={40} className="mt-2 rounded-lg max-h-32 border border-white/10" />
                            )}
                          </div>
                        </div>
                      </div>
                      <Button onClick={handleAddProject} className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6 py-3 text-lg rounded-xl" disabled={!newProject.title.trim()}>
                        {isEditingProject ? 'Save Changes' : 'Add Project'}
                      </Button>
                    </div>
                  </div>
                )}
                {viewProject && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-2xl border border-white/10 shadow-2xl relative">
                      <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={() => setViewProject(null)}>
                        <X className="w-5 h-5" />
                      </button>
                      <div className="flex flex-col md:flex-row gap-8">
                        {viewProject.image && (
                          <Image src={viewProject.image} alt="Project" width={240} height={100} className="rounded-lg max-h-60 border border-white/10 object-cover" />
                        )}
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold text-white mb-2">{viewProject.title}</h2>
                          {viewProject.year && <div className="text-xs text-gray-400 mb-2">{viewProject.year}</div>}
                          <p className="text-gray-300 mb-4 text-base">{viewProject.description}</p>
                          {viewProject.tech && viewProject.tech.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {viewProject.tech.map((tech: string) => (
                                <Badge key={tech} className="bg-blue-700 text-white text-xs">{tech}</Badge>
                              ))}
                            </div>
                          )}
                          {viewProject.tags && viewProject.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {viewProject.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">{tag}</Badge>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-3 mt-4">
                            {viewProject.link && (
                              <a href={viewProject.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">Live Project</a>
                            )}
                            {viewProject.demo && (
                              <a href={viewProject.demo} target="_blank" rel="noopener noreferrer" className="text-green-400 underline text-sm">Demo</a>
                            )}
                            {viewProject.github && (
                              <a href={viewProject.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline text-sm">GitHub</a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">UPI ID / Bank Account</label>
                    <Input
                      placeholder="Enter UPI ID"
                      className="bg-white/5 border-white/20 text-white focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Withdrawal Preference</label>
                    <select className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white">
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="on-demand">On Demand</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {providerId === 'password' ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Change Password</label>
                        <div className="relative">
                          <Input
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            className="bg-white/5 border-white/20 text-white focus:border-blue-500 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                            onClick={() => setShowCurrentPassword(v => !v)}
                            tabIndex={-1}
                          >
                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="bg-white/5 border-white/20 text-white focus:border-blue-500 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                            onClick={() => setShowNewPassword(v => !v)}
                            tabIndex={-1}
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <div className="relative">
                          <Input
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={e => setConfirmNewPassword(e.target.value)}
                            className="bg-white/5 border-white/20 text-white focus:border-blue-500 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                            onClick={() => setShowConfirmNewPassword(v => !v)}
                            tabIndex={-1}
                          >
                            {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <Button onClick={handleChangePassword} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-full" disabled={changingPassword}>
                          {changingPassword ? 'Changing...' : 'Change Password'}
                        </Button>
                        {passwordError && <div className="text-red-400 text-sm mt-2">{passwordError}</div>}
                        {passwordSuccess && <div className="text-green-400 text-sm mt-2">{passwordSuccess}</div>}
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-400 text-sm">You signed in with Google. Password change is not available.</div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-red-900/10 border-red-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-red-400 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700 w-full" onClick={() => setShowDeleteConfirm(true)}>
                    Delete Account
                  </Button>
                  {deleteError && <div className="text-red-400 text-sm mt-2">{deleteError}</div>}
                  {showDeleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                      <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-2xl relative text-center">
                        <h2 className="text-2xl font-bold text-red-400 mb-4">Delete Account</h2>
                        <p className="text-gray-300 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="flex gap-4 justify-center">
                          <Button onClick={handleDeleteAccount} variant="destructive" className="bg-red-600 hover:bg-red-700 px-6" disabled={deletingAccount}>
                            {deletingAccount ? 'Deleting...' : 'Yes, Delete'}
                          </Button>
                          <Button onClick={() => setShowDeleteConfirm(false)} variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#22c55e',
          color: 'white',
          padding: '12px 32px',
          borderRadius: 8,
          zIndex: 9999,
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          Profile saved successfully!
        </div>
      )}
    </div>
  )
}
