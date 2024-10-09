const getRaffleParticipants = (
  raffleType?: "main" | "trivia" | "memory",
) => {
  if (!raffleType || raffleType === "main") {
    const participants = JSON.parse(localStorage.getItem('users') || "{}");
    
    return participants;
  } else {
    const participants = JSON.parse(localStorage.getItem(`${raffleType}Scoreboard`) || "{}");
    
    return participants;
  }
};

export { getRaffleParticipants };
