import { eventStore } from "@/store";
import type IEvent from "@/types/IEvent";
import router from "@/router";

export default function goToEvent(event: IEvent) {
  Object.assign(eventStore, event);
  router.push(`/event/${event.id}`);
}
