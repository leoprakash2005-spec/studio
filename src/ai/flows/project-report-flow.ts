
'use server';

/**
 * @fileOverview Flow for generating a professional construction estimate report.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProjectReportInputSchema = z.object({
  projectName: z.string(),
  projectType: z.string(),
  totalArea: z.number(),
  items: z.array(z.object({
    name: z.string(),
    category: z.string(),
    total: z.number(),
  })),
  totalCost: z.number(),
});

const ProjectReportOutputSchema = z.object({
  summary: z.string().describe('A high-level professional summary of the estimate.'),
  insights: z.array(z.string()).describe('Key cost drivers or potential savings identified.'),
  formattedReport: z.string().describe('Markdown formatted detailed report.'),
});

export async function generateProjectReport(input: z.infer<typeof ProjectReportInputSchema>) {
  return projectReportFlow(input);
}

const projectReportPrompt = ai.definePrompt({
  name: 'projectReportPrompt',
  input: { schema: ProjectReportInputSchema },
  output: { schema: ProjectReportOutputSchema },
  prompt: `You are a professional construction estimator. 
  Create a detailed estimate report for the project: {{{projectName}}}.
  
  Project Details:
  - Type: {{{projectType}}}
  - Area: {{{totalArea}}} sqft
  - Total Estimated Cost: ₹{{{totalCost}}}
  
  Cost Breakdown:
  {{#each items}}
  - {{{category}}}: {{{name}}} (₹{{{total}}})
  {{/each}}
  
  Provide a professional summary, 3-5 key insights about the budget, and a full formatted report in Markdown.
  `,
});

const projectReportFlow = ai.defineFlow(
  {
    name: 'projectReportFlow',
    inputSchema: ProjectReportInputSchema,
    outputSchema: ProjectReportOutputSchema,
  },
  async (input) => {
    const { output } = await projectReportPrompt(input);
    return output!;
  }
);
