# FFMI Calculator
This is a calculator site built with React. It accepts the users' body statistics such as weight, height, and body fat % and utilizes three formulas to generate the corresponding values: 
- FFMI = (Lean Weight / 2.2) / ((Feet * 12.0 + Inches) * 0.0254)2
- Adjusted FFMI = FFMI + ( 6.3 * (1.8 - (Feet * 12.0 + Inches) * 0.0254))
- BMI = Body Weight / (Height ^ 2)

The site also features a simple implementation of Chart.JS to create two responsive charts that will plot/highlight the generated values in comparison to the average adult population in the United States. 
