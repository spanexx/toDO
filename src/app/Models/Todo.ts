export class Todo{
    id?: string;
    title!: string;
    description!: string;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
    dueDate?: string;
    priority?: Priority;
    subtasks?: SubTasks[];

}


export class SubTasks{
    title!: string
    completed!: boolean
}

enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high' 
}