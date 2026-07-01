"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock3, Edit3, ListChecks, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getTasks, createTask, updateTask, deleteTask } from "@/services/client/task.service";
import type { Task, TaskStatus } from "@/types/task";
import { createTaskSchema, updateTaskSchema } from "@/validators/task";
import type { z } from "zod";

type CreateTaskValues = z.infer<typeof createTaskSchema>;
type UpdateTaskValues = z.infer<typeof updateTaskSchema>;

const statusOptions: Array<TaskStatus | "ALL"> = ["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"];

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const createForm = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: "", description: "" },
  });

  const updateForm = useForm<UpdateTaskValues>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: { title: "", description: "" },
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (selectedTask && editOpen) {
      updateForm.reset({ title: selectedTask.title, description: selectedTask.description });
    }
  }, [selectedTask, editOpen, updateForm]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      toast.error("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = [task.title, task.description].some((value) =>
        value.toLowerCase().includes(search.toLowerCase()),
      );
      const matchesStatus = statusFilter === "ALL" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => task.status === "PENDING").length,
      inProgress: tasks.filter((task) => task.status === "IN_PROGRESS").length,
      completed: tasks.filter((task) => task.status === "COMPLETED").length,
    }),
    [tasks],
  );

  const openEdit = (task: Task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const openDelete = (task: Task) => {
    setSelectedTask(task);
    setDeleteOpen(true);
  };

  const handleCreate = async (values: CreateTaskValues) => {
    try {
      await createTask(values);
      toast.success("Task created successfully");
      setCreateOpen(false);
      createForm.reset();
      await fetchTasks();
    } catch (error) {
      toast.error("Unable to create task");
    }
  };

  const handleUpdate = async (values: UpdateTaskValues) => {
    if (!selectedTask) return;

    try {
      await updateTask(selectedTask.id, values);
      toast.success("Task updated successfully");
      setEditOpen(false);
      setSelectedTask(null);
      await fetchTasks();
    } catch (error) {
      toast.error("Unable to update task");
    }
  };

  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      await deleteTask(selectedTask.id);
      toast.success("Task deleted successfully");
      setDeleteOpen(false);
      setSelectedTask(null);
      await fetchTasks();
    } catch (error) {
      toast.error("Unable to delete task");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background text-foreground">
        <div className="grid min-h-screen grid-cols-[auto_1fr]">
          <Sidebar />
          <div className="flex min-h-screen flex-col gap-6 p-6 md:p-8">
            <TopNav search={search} onSearch={setSearch} />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <section className="grid gap-6">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Overview</p>
                    <h2 className="text-3xl font-semibold">Project tasks at a glance</h2>
                  </div>
                  <Button className="w-full sm:w-auto" onClick={() => setCreateOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    New task
                  </Button>
                </div>

                <div className="grid gap-4 xl:grid-cols-4">
                  {[
                    { label: "Total", value: stats.total, icon: ListChecks },
                    { label: "Pending", value: stats.pending, icon: Clock3 },
                    { label: "In progress", value: stats.inProgress, icon: CheckCircle2 },
                    { label: "Completed", value: stats.completed, icon: CheckCircle2 },
                  ].map((card) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm shadow-black/5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">{card.label}</p>
                          <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                        </div>
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                          <card.icon size={20} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="grid gap-6">
                <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-sm shadow-black/5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Filter tasks</p>
                      <p className="text-xs text-muted-foreground">Refine what appears in the task table.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setStatusFilter(status)}
                          className={
                            statusFilter === status
                              ? "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                              : "rounded-full border border-border px-4 py-2 text-sm text-foreground transition hover:border-primary hover:text-primary"
                          }
                        >
                          {status === "ALL" ? "All" : status.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-border/80 bg-background/80 p-5">
                    <p className="text-sm text-muted-foreground">Search and filter your tasks by status, priority, and text query.</p>
                  </div>
                </div>
              </section>
            </div>

            <section className="grid gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Tasks</h2>
                <p className="text-sm text-muted-foreground">Showing {filteredTasks.length} tasks</p>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 shadow-sm shadow-black/5">
                <table className="min-w-full divide-y divide-border text-left text-sm">
                  <thead className="bg-background/80">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Task</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Status</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Updated</th>
                      <th className="px-6 py-4 font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">
                    {loading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="px-6 py-5">
                            <div className="h-4 w-48 rounded-full bg-muted/50" />
                          </td>
                          <td className="px-6 py-5">
                            <div className="h-4 w-24 rounded-full bg-muted/50" />
                          </td>
                          <td className="px-6 py-5">
                            <div className="h-4 w-32 rounded-full bg-muted/50" />
                          </td>
                          <td className="px-6 py-5">
                            <div className="h-4 w-20 rounded-full bg-muted/50" />
                          </td>
                        </tr>
                      ))
                    ) : filteredTasks.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-20 text-center text-sm text-muted-foreground">
                          <div className="mx-auto inline-flex max-w-xs flex-col items-center gap-3 rounded-[1.5rem] border border-dashed border-border/80 bg-muted/10 p-10">
                            <AlertTriangle size={32} className="text-muted-foreground" />
                            <p className="text-base font-semibold text-foreground">No tasks match your filter</p>
                            <p className="text-sm text-muted-foreground">Create a new task or adjust your search criteria.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredTasks.map((task) => (
                        <tr key={task.id} className="transition hover:bg-background/60">
                          <td className="px-6 py-5">
                            <div className="text-sm font-semibold text-foreground">{task.title}</div>
                            <div className="mt-1 text-sm text-muted-foreground">{task.description}</div>
                          </td>
                          <td className="px-6 py-5">
                            <Badge status={task.status} />
                          </td>
                          <td className="px-6 py-5 text-sm text-muted-foreground">{new Date(task.updatedAt).toLocaleDateString()}</td>
                          <td className="px-6 py-5 space-x-2">
                            <Button variant="outline" size="sm" onClick={() => openEdit(task)}>
                              <Edit3 size={14} className="mr-2" />
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => openDelete(task)}>
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create a task" description="Add a new task to your workspace.">
          <form className="grid gap-4" onSubmit={createForm.handleSubmit(handleCreate)}>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input {...createForm.register("title")} placeholder="Design landing page" />
              {createForm.formState.errors.title ? (
                <p className="text-sm text-destructive">{createForm.formState.errors.title.message}</p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea {...createForm.register("description")} placeholder="Describe task details and expectations." />
              {createForm.formState.errors.description ? (
                <p className="text-sm text-destructive">{createForm.formState.errors.description.message}</p>
              ) : null}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create task</Button>
            </div>
          </form>
        </Modal>

        <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit task" description="Update the selected task.">
          <form className="grid gap-4" onSubmit={updateForm.handleSubmit(handleUpdate)}>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input {...updateForm.register("title")} placeholder="Update task title" />
              {updateForm.formState.errors.title ? (
                <p className="text-sm text-destructive">{updateForm.formState.errors.title.message}</p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea {...updateForm.register("description")} placeholder="Update task description" />
              {updateForm.formState.errors.description ? (
                <p className="text-sm text-destructive">{updateForm.formState.errors.description.message}</p>
              ) : null}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Modal>

        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete task" description="This action cannot be undone.">
          <div className="grid gap-4">
            <p className="text-sm text-muted-foreground">Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" type="button" onClick={handleDelete}>
                Delete task
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </ProtectedRoute>
  );
}
