import Chat from "@/app/components/Chat";
import { getChat } from "@/db";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function ChatDetail({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = await params;
  const chat = await getChat(+chatId);

  if (!chat) {
    return notFound();
  }

  const session = await getServerSession();
  if (!session || String(session.user?.email) !== String(chat.user_email)) {
    return redirect("/");
  }

  return (
    <main className="pt-5">
      <Chat id={+chatId} key={chatId} messages={chat?.messages} />
    </main>
  );
}
