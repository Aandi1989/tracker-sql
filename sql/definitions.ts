export type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type Issue = {
    id: number;
    title: string;
    description: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    assigninedToUserId: string;
};

export type User = {
    id:number,
    name?: string,
    email: string,
    emailVerified?: string,
    image?: string ,
    hashedPassword: string
}

