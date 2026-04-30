import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const client = await clerkClient();
    const users = await client.users.getUserList();
    
    const formattedUsers = users.data.map(user => ({
      id: user.id,
      username: user.username || user.firstName || "Anonymous",
      full_name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.emailAddresses[0]?.emailAddress,
      avatar_url: user.imageUrl,
      role: (user.publicMetadata.role as string) || (user.emailAddresses[0]?.emailAddress === "xyzg135@gmail.com" ? "admin" : "user"),
      created_at: user.createdAt
    }));

    return NextResponse.json(formattedUsers);
  } catch (error: any) {
    console.error("Clerk Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId, role } = await req.json();
    const client = await clerkClient();
    
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();
    const client = await clerkClient();
    
    await client.users.deleteUser(userId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
