// Implemented personalized style recommendations flow using browsing history and preferences to enhance user experience.

'use server';

/**
 * @fileOverview Provides personalized style recommendations based on user history and preferences.
 *
 * - getStyleRecommendations - A function that generates style recommendations for a user.
 * - StyleRecommendationsInput - The input type for the getStyleRecommendations function.
 * - StyleRecommendationsOutput - The return type for the getStyleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleRecommendationsInputSchema = z.object({
  userHistory: z
    .string()
    .describe('The browsing history of the user, including viewed items and categories.'),
  userPreferences: z
    .string()
    .describe('The stated preferences of the user, including preferred styles, colors, and brands.'),
});
export type StyleRecommendationsInput = z.infer<typeof StyleRecommendationsInputSchema>;

const StyleRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of recommended clothing items with descriptions and links.'),
});
export type StyleRecommendationsOutput = z.infer<typeof StyleRecommendationsOutputSchema>;

export async function getStyleRecommendations(input: StyleRecommendationsInput): Promise<StyleRecommendationsOutput> {
  return styleRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleRecommendationsPrompt',
  input: {schema: StyleRecommendationsInputSchema},
  output: {schema: StyleRecommendationsOutputSchema},
  prompt: `You are a personal stylist providing personalized clothing recommendations.

  Based on the user's browsing history and stated preferences, recommend clothing items that match their style. Provide a brief description and a link to each item.

  User History: {{{userHistory}}}
  User Preferences: {{{userPreferences}}}
  `,
});

const styleRecommendationsFlow = ai.defineFlow(
  {
    name: 'styleRecommendationsFlow',
    inputSchema: StyleRecommendationsInputSchema,
    outputSchema: StyleRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
