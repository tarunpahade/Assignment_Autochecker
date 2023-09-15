export default function sortParticipantsAlphabetically(participants:string[]) {
    participants.sort((a, b) => {
      return a.localeCompare(b);
    });
  
    return participants;
  }