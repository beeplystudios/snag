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
      Inbox
      <OnBottom onBottom={() => void messagesQuery.fetchNextPage()}>
        {messages?.map((message) => (
          <div key={message.id}>{message.message}</div>
        ))}
      </OnBottom>
    </div>
  );
};
