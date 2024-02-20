function addPlayerToLeaderboard(name, score) {
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const existingPlayerIndex = leaderboardData.findIndex(player => player.name === name);
    if (existingPlayerIndex !== -1) {
        if (score > leaderboardData[existingPlayerIndex].score) {
            leaderboardData[existingPlayerIndex].score = score;
            localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
        }
    } else {
        leaderboardData.push({ name, score });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    }
}