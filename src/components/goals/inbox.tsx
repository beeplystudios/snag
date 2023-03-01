import { api } from "@/utils/api";
import { OnBottom } from "../ui/on-bottom";

export const Inbox: React.FC = () => {
  const messagesQuery = api.user.getMessages.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const messages = messagesQuery.data?.pages.flatMap((p) => p.messages);

  return (
    <div>
      <h3 className="text-2xl font-bold">Inbox</h3>
      <hr />
      <OnBottom onBottom={() => void messagesQuery.fetchNextPage()}>
        {messages?.map((message) => (
          <div
            key={message.id}
            className="flex flex-wrap gap-2 border-b border-slate-300 py-2"
          >
            <p>{message.message}</p>
            <p className="text-neutral-600">{message.points} points</p>
            <p className="text-neutral-600">{message.sender.name}</p>
          </div>
        ))}
        <p className="mt-3 text-center text-neutral-900/80">
          {messagesQuery.hasNextPage
            ? "Fetching more messages.."
            : "No more messages.."}
        </p>
      </OnBottom>
    </div>
  );
};
