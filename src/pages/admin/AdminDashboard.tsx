import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Calendar, GraduationCap, MessageSquare, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { data: coachesCount } = useQuery({
    queryKey: ["coaches-count"],
    queryFn: async () => {
      const { count } = await supabase.from("coaches").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: eventsCount } = useQuery({
    queryKey: ["events-count"],
    queryFn: async () => {
      const { count } = await supabase.from("events").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: studentsCount } = useQuery({
    queryKey: ["students-count"],
    queryFn: async () => {
      const { count } = await supabase.from("students").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: messagesCount } = useQuery({
    queryKey: ["messages-count"],
    queryFn: async () => {
      const { count } = await supabase.from("messages").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: unreadMessages } = useQuery({
    queryKey: ["unread-messages"],
    queryFn: async () => {
      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);
      return count || 0;
    },
  });

  const { data: pendingStudents } = useQuery({
    queryKey: ["pending-students"],
    queryFn: async () => {
      const { count } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      return count || 0;
    },
  });

  const stats = [
    {
      title: "Total Coaches",
      value: coachesCount ?? 0,
      icon: Users,
      color: "bg-blue-500/10 text-blue-500",
      link: "/admin/coaches",
    },
    {
      title: "Total Events",
      value: eventsCount ?? 0,
      icon: Calendar,
      color: "bg-green-500/10 text-green-500",
      link: "/admin/events",
    },
    {
      title: "Student Registrations",
      value: studentsCount ?? 0,
      icon: GraduationCap,
      color: "bg-purple-500/10 text-purple-500",
      link: "/admin/students",
    },
    {
      title: "Total Messages",
      value: messagesCount ?? 0,
      icon: MessageSquare,
      color: "bg-orange-500/10 text-orange-500",
      link: "/admin/messages",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your Taekwondo club today.
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <Link to={stat.link}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions & Alerts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pending Items */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Pending Actions
                </CardTitle>
                <CardDescription>Items that need your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(pendingStudents ?? 0) > 0 && (
                  <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-foreground">Pending Students</p>
                        <p className="text-sm text-muted-foreground">
                          {pendingStudents} registration{pendingStudents !== 1 ? "s" : ""} awaiting review
                        </p>
                      </div>
                    </div>
                    <Link to="/admin/students">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </Link>
                  </div>
                )}

                {(unreadMessages ?? 0) > 0 && (
                  <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-foreground">Unread Messages</p>
                        <p className="text-sm text-muted-foreground">
                          {unreadMessages} new message{unreadMessages !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <Link to="/admin/messages">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                )}

                {(pendingStudents ?? 0) === 0 && (unreadMessages ?? 0) === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>All caught up! No pending items.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Link to="/admin/coaches">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Users className="w-4 h-4" />
                    Add New Coach
                  </Button>
                </Link>
                <Link to="/admin/events">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    Create New Event
                  </Button>
                </Link>
                <Link to="/admin/students">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <GraduationCap className="w-4 h-4" />
                    View Student Applications
                  </Button>
                </Link>
                <Link to="/admin/messages">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Check Messages
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
