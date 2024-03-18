export async function initialMailTemplate(){


}
export async function generate_email_template(company_name, employee_email, current_round, state, country, about_company, business_model, revenue, traction, problem_solution, usp_competitors, about_team, market_size, investment_ask, valuation, commitment, previous_round, pitch_deck_link){
   let email_template = `
    <html>
    <body>
   
    <p>Dear ${employee_first_name},</p>
    <p>Greetings from AY Ventures.</p>
    <p>We are delighted to bring you an exclusive investment opportunity to invest in {current_round} round of ${company_name} from ${state?state:""}, ${country}.</p>
    <br>
    <p>About the company:</p>
    <p>${about_company}</p>
    <p>Business Model:</p>
    <p>${business_model}</p>
    <p>Revenue: ${revenue}</p>
    <p>Traction:</p>
    <p>${traction}</p>
    <p>Problem & Solution:</p>
    <p>{problem_solution}</p>
    <p>USP & Competitors:</p>
    <p>{usp_competitors}</p>
    <p>About the Team:</p>
    <p>{about_team}</p>
    <p>Market Size: {market_size}</p>
    <p>Investment Ask: {investment_ask}</p>
    <p>Valuation: {valuation}</p>
    <p>Commitment:</p>
    <p>{commitment}</p>
    <p>Previous Round:</p>
    <p>{previous_round}</p>
    <p>Pitch Deck: {pitch_deck_link}</p>
    <p>If you like this deal, please reply so that we can book a Gmeet/Zoom meeting with the founder as per your availability.</p>
    <br>
    <p>From AY Ventures Investment Team,</p>
    <br>
    <p>Mobile: (+91) xxxxxxxxxx</p>
    <p>Email: deals@ayventures.in</p>
    <p>LinkedIn | Facebook | Instagram | X</p>
    <p>Website</p>
    <p>Company Profile</p>
    </body>
    </html>
    `
    return email_template
}