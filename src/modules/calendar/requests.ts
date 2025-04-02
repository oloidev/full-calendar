import { CALENDAR_ITEMS_MOCK, USERS_MOCK } from "@/modules/calendar/mocks";

export const getEvents = async () => {
  // Increase the delay to better see the loading state
  await new Promise(resolve => setTimeout(resolve, 800));
  return CALENDAR_ITEMS_MOCK;
};

export const getUsers = async () => {
  // Increase the delay to better see the loading state
  await new Promise(resolve => setTimeout(resolve, 800));
  return USERS_MOCK;
};
