function url() {
  return Object.assign(
    {},
    {
      apis: {
        root: 'http://localhost:8080/api/talks/routings/root',
        stories: 'http://localhost:8080/api/stories',
        conversations: 'http://localhost:8080/api/talks/routings/conversations',
      },
    }
  );
}

export default url();
