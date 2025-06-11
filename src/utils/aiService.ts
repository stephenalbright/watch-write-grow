
interface FeedbackItem {
  title: string;
  text: string;
  type: 'encouragement' | 'spelling' | 'detail' | 'structure' | 'tryAgain';
}

export const generateFeedback = async (
  userWriting: string, 
  videoDescription: string
): Promise<FeedbackItem[]> => {
  console.log('Generating feedback for:', userWriting);
  console.log('Video description:', videoDescription);

  // For now, we'll return mock feedback based on the writing
  // In a real app, this would call OpenAI API
  return new Promise((resolve) => {
    setTimeout(() => {
      const feedback = generateMockFeedback(userWriting, videoDescription);
      resolve(feedback);
    }, 1500); // Simulate API delay
  });
};

const generateMockFeedback = (writing: string, description: string): FeedbackItem[] => {
  const feedback: FeedbackItem[] = [];
  
  // Always include encouragement
  feedback.push({
    title: "Great job! 🌟",
    text: writing.length > 20 
      ? "You wrote a detailed description! That shows you were paying attention."
      : "You gave it a try! That's the most important thing.",
    type: 'encouragement'
  });

  // Check for common issues and provide feedback
  if (writing.length > 0) {
    // Spelling/Grammar feedback
    if (!writing[0].match(/[A-Z]/)) {
      feedback.push({
        title: "Try fixing this ✏️",
        text: "Remember to start your sentence with a capital letter!",
        type: 'spelling'
      });
    }

    // Missing details feedback
    const videoKeywords = ['dog', 'ball', 'park', 'woman', 'tree'];
    const mentionedKeywords = videoKeywords.filter(keyword => 
      writing.toLowerCase().includes(keyword)
    );
    
    if (mentionedKeywords.length < 2) {
      const missedDetails = videoKeywords.filter(keyword => 
        !writing.toLowerCase().includes(keyword)
      );
      feedback.push({
        title: "Add more details 📝",
        text: `You could mention the ${missedDetails.slice(0, 2).join(' or the ')} to make your description even better!`,
        type: 'detail'
      });
    }

    // Structure suggestion
    if (writing.length > 10 && !writing.includes('.') && !writing.includes('!')) {
      feedback.push({
        title: "Here's another way to say it 💡",
        text: "Try ending your sentence with a period (.) to make it complete!",
        type: 'structure'
      });
    }

    // Advanced suggestion for longer writing
    if (writing.length > 30) {
      feedback.push({
        title: "Level up your writing! 🚀",
        text: "Try using describing words like 'happy dog' or 'red ball' to paint a picture with your words.",
        type: 'structure'
      });
    }
  }

  return feedback.slice(0, 4); // Limit to 4 feedback cards
};
