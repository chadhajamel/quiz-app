<template>
    <div class="home-container">
        <div class="hero-image">
            <img src="@/assets/images/art-human-brain.avif" alt="Creative Brain Concept" />
        </div>
        <div class="content">
            <h1>Welcome to the ColorMind Quiz App!</h1>
            <p>Test your knowledge and creativity with our interactive quiz.</p>
            <RouterLink  to="/quiz">
                <button class="start-button">Start Quiz</button>
            </RouterLink >
        </div>
    </div>
</template>

<script>

</script>





<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.hero-image {
    width: 100%;
    max-width: 500px;
    margin-bottom: 2rem;
}

.hero-image img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content {
    text-align: center;
}

.start-button {
    background-color: #4CAF50;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 25px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: transform 0.2s;
    margin-top: 1rem;
}

.start-button:hover {
    transform: scale(1.05);
}
</style>