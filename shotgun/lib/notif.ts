export const sendNotification = (userName: string, eventTitle: string, eventDate: string) => {
    console.log(`Notification: ${userName}, n\'oubliez pas ! ${eventTitle} commence le ${eventDate}.`);
  };
  
  export const checkNotifications = (currentTime: Date, users: any[], events: any[], participants: any[]) => {
    participants.forEach((participant) => {
      const user = users.find((u) => u.id === participant.user_id);
      const event = events.find((e) => e.id === participant.event_id);
  
      if (!user || !event) return;
  
      const eventDate = new Date(event.date);
      const reminderTime = new Date(eventDate.getTime() - 60 * 60 * 1000); 
  
      if (currentTime >= reminderTime && currentTime < eventDate) {
        sendNotification(user.name, event.title, event.date);
      }
    });
  };
  