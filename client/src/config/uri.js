function uri() {
  return Object.assign(
    {},
    {
      routes: {
        landing: '/',
        stories: '/stories',
        story_pattern: '/stories/:story_pattern/:now_step',
        conversations: '/conversations',
        requests: '/requests',
        questions: '/questions',
        questions_pattern: '/questions/:pattern',
      },
    }
  );
}

export default uri();
