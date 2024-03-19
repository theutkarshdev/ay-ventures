export async function initialMailTemplate(){


}
export async function generate_email_template(investor, startup) {
   let email_template = `
    <html>
    <body>
   <p>Dear ${investor.employees[0].first_name},</p>
<p>Greetings from AY Ventures.</p>
    <p>We are delighted to bring you an exclusive investment opportunity to invest in ${startup.currentRound} round of ${startup.companyName} from ${startup.location?.state},${startup.location?.country}.
    </p>
    <br>
    <p><strong>About the company:</strong></p>
    <p>${startup.aboutTheCompany}</p>
    <p><strong>Business Model:</strong></p>
    <p>${startup.businessModel}</p>
    <p><strong>Revenue:</strong>${startup.revenue}</p>
    <p><strong>Traction:</strong></p>
    <p>${startup.traction}</p>
    <p><strong>Problem & Solution:</strong></p>
    <p>${startup.problemAndSolution}</p>
    <p><strong>USP & Competitors:<strong></p>
    <p>${startup.uSPAndCompetitors}</p>
    <p><strong>About the Team:<strong></p>
    <p>${startup.aboutTheTeam}</p>
    <p><strong>Market Size:</strong>${startup.marketSize}</p>
    <p><strong>Investment Ask:</strong>${startup.investmentAsk}</p>
    <p><strong>Valuation:</strong>${startup.valuation}</p>
    <p><strong>Commitment:<strong></p>
    <p>${startup.commitments}</p>
    <p><strong>Previous Round:<strong></p>
    <p>${startup.previousRounds}</p>
    <p><strong>Pitch Deck:</strong><a href=${startup.pitchDeck}>${startup.pitchDeck}</a></p>
    <br>
    <br>
    <p>From AY Ventures Investment Team,</p>
    <footer>
    
    
    </footer>
    </body>
    </html>
    `
    return email_template
}