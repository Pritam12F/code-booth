import { aiClient } from "../client/llm";

export const getReviewAndRating = async (
  HTML: string,
  CSS: string,
  JS: string,
  Tasks: string[]
): Promise<{
  review: string;
  rating: number;
}> => {
  const review = await aiClient.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are an excellent code reviewer. Your job is to take HTML, CSS and JSS code and review it against coding tasks that were provided.\n
      You generate a good descriptive review and give a rating out of 10.0.\n
      Generate a review and rating for this code:\n {
      HTML: ${HTML},\n
      CSS: ${CSS},\n
      JS: ${JS},\n
      } against these tasks: ${[...Tasks]}.\n
      The response should be in the following format of JSON:\n {
      review: string (review of the code)\n
      rating: number (out of 10)\n
      }\n 
      `,
  });

  return JSON.parse(review.text ?? "");
};
