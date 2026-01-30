'use server';

/**
 * @fileOverview Flow for generating and sending rent due notifications to tenants.
 *
 * - `sendRentDueNotification`: Function to send rent due notifications.
 * - `RentDueNotificationInput`: Input type for the `sendRentDueNotification` function.
 * - `RentDueNotificationOutput`: Return type for the `sendRentDueNotification` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RentDueNotificationInputSchema = z.object({
  tenantName: z.string().describe('The name of the tenant.'),
  unitNumber: z.string().describe('The unit number of the tenant.'),
  rentAmount: z.number().describe('The rent amount due.'),
  dueDate: z.string().describe('The due date for the rent payment (YYYY-MM-DD).'),
  daysUntilDue: z.number().describe('Number of days until the rent due date.  Negative if overdue.'),
  lateFee: z.number().optional().describe('Late fee amount, if applicable.'),
});
export type RentDueNotificationInput = z.infer<typeof RentDueNotificationInputSchema>;

const RentDueNotificationOutputSchema = z.object({
  title: z.string().describe('The title of the notification.'),
  message: z.string().describe('The content of the notification.'),
});
export type RentDueNotificationOutput = z.infer<typeof RentDueNotificationOutputSchema>;

export async function sendRentDueNotification(input: RentDueNotificationInput): Promise<RentDueNotificationOutput> {
  return rentDueNotificationFlow(input);
}

const rentDueNotificationPrompt = ai.definePrompt({
  name: 'rentDueNotificationPrompt',
  input: {schema: RentDueNotificationInputSchema},
  output: {schema: RentDueNotificationOutputSchema},
  prompt: `You are a helpful assistant that generates rent due notifications for tenants.

  Based on the following information, create a notification title and message to remind the tenant about their upcoming or overdue rent payment.

  Tenant Name: {{{tenantName}}}
  Unit Number: {{{unitNumber}}}
  Rent Amount: {{{rentAmount}}}
  Due Date: {{{dueDate}}}
  Days Until Due: {{{daysUntilDue}}}
  {{#if lateFee}}
  Late Fee: {{{lateFee}}}
  {{/if}}

  Title: (maximum 50 characters)
  Message: (maximum 150 characters)
  `,
});

const rentDueNotificationFlow = ai.defineFlow(
  {
    name: 'rentDueNotificationFlow',
    inputSchema: RentDueNotificationInputSchema,
    outputSchema: RentDueNotificationOutputSchema,
  },
  async input => {
    const {output} = await rentDueNotificationPrompt(input);
    return output!;
  }
);
