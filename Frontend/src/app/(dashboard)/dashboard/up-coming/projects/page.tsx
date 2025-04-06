'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const projects = [
    {
        id: 1,
        name: 'AI Image Recognition',
        description: 'Developing a new algorithm for medical image recognition',
        progress: 65,
        deadline: '2025-06-20',
        status: 'In Progress',
        members: [
            { id: 1, name: 'Anh Nguyen', role: 'Project Lead', avatar: '/avatars/anhnguyen.png', initials: 'AN' },
            { id: 2, name: 'Binh Tran', role: 'Data Scientist', avatar: '/avatars/binhtran.png', initials: 'BT' },
            { id: 3, name: 'Cong Le', role: 'ML Engineer', avatar: '/avatars/congle.png', initials: 'CL' },
        ],
    },
    {
        id: 2,
        name: 'Natural Language Processing',
        description: 'Building a Vietnamese language processing pipeline',
        progress: 40,
        deadline: '2025-07-15',
        status: 'In Progress',
        members: [
            { id: 4, name: 'Tran Chi Tam', role: 'NLP Specialist', avatar: '/avatars/duongpham.png', initials: 'DP' },
            { id: 5, name: 'Huynh Vuong Khang', role: 'Research Assistant', avatar: '/avatars/emvo.png', initials: 'EV' },
        ],
    },
    {
        id: 3,
        name: 'Deep Learning Framework',
        description: 'Custom framework for biomedical applications',
        progress: 15,
        deadline: '2025-09-30',
        status: 'Early Stage',
        members: [
            { id: 6, name: 'Nguyen Tien Thuan', role: 'Core Developer', avatar: '/avatars/gianghoang.png', initials: 'GH' },
            { id: 1, name: 'Tran Phu Tho', role: 'Project Advisor', avatar: '/avatars/anhnguyen.png', initials: 'AN' },
        ],
    },
];

const tasks = [
    {
        id: 1,
        projectId: 1,
        name: 'Data Collection',
        status: 'Completed',
        assignee: 'Binh Tran',
        deadline: '2025-03-15',
        progress: 100,
    },
    {
        id: 2,
        projectId: 1,
        name: 'Algorithm Design',
        status: 'In Progress',
        assignee: 'Anh Nguyen',
        deadline: '2025-05-20',
        progress: 70,
    },
    {
        id: 3,
        projectId: 1,
        name: 'Training System',
        status: 'In Progress',
        assignee: 'Cong Le',
        deadline: '2025-06-01',
        progress: 40,
    },
    {
        id: 4,
        projectId: 2,
        name: 'Tokenizer Development',
        status: 'In Progress',
        assignee: 'Duong Pham',
        deadline: '2025-05-10',
        progress: 60,
    },
    {
        id: 5,
        projectId: 2,
        name: 'Model Training',
        status: 'Not Started',
        assignee: 'Em Vo',
        deadline: '2025-06-15',
        progress: 0,
    },
    {
        id: 6,
        projectId: 3,
        name: 'Architecture Planning',
        status: 'In Progress',
        assignee: 'Giang Hoang',
        deadline: '2025-05-30',
        progress: 30,
    },
];

export default function ProjectsManagement() {
    const [activeProject, setActiveProject] = useState(projects[0]);
    const [showReportDialog, setShowReportDialog] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

    // Filter tasks for the active project
    const projectTasks = tasks.filter((task) => task.projectId === activeProject.id);

    const statusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-500';
            case 'In Progress':
                return 'bg-blue-500';
            case 'Not Started':
                return 'bg-gray-500';
            case 'Early Stage':
                return 'bg-purple-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Lab Projects Management</h1>
                <Button>New Project</Button>
            </div>

            <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="members">Team</TabsTrigger>
                </TabsList>

                {/* Projects Tab */}
                <TabsContent value="projects" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {projects.map((project) => (
                            <Card
                                key={project.id}
                                className={`cursor-pointer ${
                                    activeProject.id === project.id ? 'ring-2 ring-primary' : ''
                                }`}
                                onClick={() => setActiveProject(project)}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle>{project.name}</CardTitle>
                                        <Badge className={statusColor(project.status)} variant="secondary">
                                            {project.status}
                                        </Badge>
                                    </div>
                                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Progress</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <Progress value={project.progress} />
                                        <div className="flex justify-between text-sm mt-2">
                                            <span>Deadline</span>
                                            <span>{new Date(project.deadline).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex -space-x-2">
                                        {project.members.slice(0, 3).map((member) => (
                                            <Avatar key={member.id} className="border-2 border-background">
                                                <AvatarImage src={member.avatar} alt={member.name} />
                                                <AvatarFallback>{member.initials}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {project.members.length > 3 && (
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-medium">
                                                +{project.members.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Project Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{activeProject.name}</CardTitle>
                            <CardDescription>{activeProject.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Tasks</h3>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[300px]">Task</TableHead>
                                                <TableHead>Assignee</TableHead>
                                                <TableHead>Deadline</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Progress</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {projectTasks.map((task) => (
                                                <TableRow key={task.id}>
                                                    <TableCell className="font-medium">{task.name}</TableCell>
                                                    <TableCell>{task.assignee}</TableCell>
                                                    <TableCell>
                                                        {new Date(task.deadline).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                task.status === 'Completed' ? 'default' : 'outline'
                                                            }>
                                                            {task.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Progress value={task.progress} className="w-[80px]" />
                                                            <span className="text-xs">{task.progress}%</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setActiveTaskId(task.id);
                                                                setShowReportDialog(true);
                                                            }}>
                                                            Update
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">Team Members</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {activeProject.members.map((member) => (
                                            <Card key={member.id}>
                                                <CardContent className="p-4 flex items-center gap-4">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={member.avatar} alt={member.name} />
                                                        <AvatarFallback>{member.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h4 className="font-medium">{member.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tasks Tab */}
                <TabsContent value="tasks">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Tasks</CardTitle>
                            <CardDescription>View and manage tasks across all projects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[250px]">Task</TableHead>
                                        <TableHead>Project</TableHead>
                                        <TableHead>Assignee</TableHead>
                                        <TableHead>Deadline</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Progress</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tasks.map((task) => {
                                        const taskProject = projects.find((p) => p.id === task.projectId);
                                        return (
                                            <TableRow key={task.id}>
                                                <TableCell className="font-medium">{task.name}</TableCell>
                                                <TableCell>{taskProject?.name}</TableCell>
                                                <TableCell>{task.assignee}</TableCell>
                                                <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={task.status === 'Completed' ? 'default' : 'outline'}>
                                                        {task.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Progress value={task.progress} className="w-[80px]" />
                                                        <span className="text-xs">{task.progress}%</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setActiveTaskId(task.id);
                                                            setShowReportDialog(true);
                                                        }}>
                                                        Update
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Team Members Tab */}
                <TabsContent value="members">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Members</CardTitle>
                            <CardDescription>View all team members across projects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Get unique members across all projects */}
                                {Array.from(
                                    new Set(projects.flatMap((project) => project.members.map((member) => member.id)))
                                ).map((memberId) => {
                                    // Find member details from the first project they appear in
                                    const member = projects.flatMap((p) => p.members).find((m) => m.id === memberId);
                                    if (!member) return null;

                                    // Find projects this member is involved in
                                    const memberProjects = projects.filter((project) =>
                                        project.members.some((m) => m.id === memberId)
                                    );

                                    // Find tasks assigned to this member
                                    const memberTasks = tasks.filter((task) => task.assignee === member.name);

                                    return (
                                        <Card key={member.id}>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={member.avatar} alt={member.name} />
                                                        <AvatarFallback>{member.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-lg">{member.name}</CardTitle>
                                                        <CardDescription>
                                                            {memberProjects
                                                                .map(
                                                                    (p) =>
                                                                        p.members.find((m) => m.id === member.id)?.role
                                                                )
                                                                .join(', ')}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <div className="text-sm font-medium">
                                                        Projects ({memberProjects.length})
                                                    </div>
                                                    <div className="space-y-1">
                                                        {memberProjects.map((project) => (
                                                            <div
                                                                key={project.id}
                                                                className="text-sm text-muted-foreground flex justify-between">
                                                                <span>{project.name}</span>
                                                                <Badge variant="outline" className="text-xs">
                                                                    {
                                                                        project.members.find((m) => m.id === member.id)
                                                                            ?.role
                                                                    }
                                                                </Badge>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="mt-3 text-sm font-medium">
                                                        Tasks ({memberTasks.length})
                                                    </div>
                                                    <div className="space-y-1">
                                                        {memberTasks.map((task) => (
                                                            <div
                                                                key={task.id}
                                                                className="text-sm text-muted-foreground flex justify-between">
                                                                <span>{task.name}</span>
                                                                <Badge
                                                                    variant={
                                                                        task.status === 'Completed'
                                                                            ? 'default'
                                                                            : 'outline'
                                                                    }
                                                                    className="text-xs">
                                                                    {task.status}
                                                                </Badge>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Progress Report Dialog */}
            <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Update Task Progress</DialogTitle>
                        <DialogDescription>
                            Report your progress on this task and add any notes or blockers.
                        </DialogDescription>
                    </DialogHeader>

                    {activeTaskId && (
                        <>
                            {(() => {
                                const task = tasks.find((t) => t.id === activeTaskId);
                                if (!task) return null;

                                return (
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-1">
                                            <div>
                                                <strong>Task:</strong> {task.name}
                                            </div>
                                            <div>
                                                <strong>Project:</strong>{' '}
                                                {projects.find((p) => p.id === task.projectId)?.name}
                                            </div>
                                            <div>
                                                <strong>Current Progress:</strong> {task.progress}%
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="progress">Update Progress</Label>
                                            <div className="grid grid-cols-11 gap-2 items-center">
                                                <Select defaultValue={task.progress.toString()}>
                                                    <SelectTrigger className="col-span-10">
                                                        <SelectValue placeholder="Select progress percentage" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
                                                            <SelectItem key={value} value={value.toString()}>
                                                                {value}%
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="status">Update Status</Label>
                                            <Select defaultValue={task.status}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Not Started">Not Started</SelectItem>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="Completed">Completed</SelectItem>
                                                    <SelectItem value="Blocked">Blocked</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Progress Notes</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Add details about your progress, challenges, or blockers..."
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                    </div>
                                );
                            })()}
                        </>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowReportDialog(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Submit Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
