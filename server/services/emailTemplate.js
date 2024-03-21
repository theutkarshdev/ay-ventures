export async function initialMailTemplate(investor, startup) {
  let emailTemplate = `
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
    `;
  return emailTemplate;
}

export async function followUP1MailTemplate(investor, startup) {
  let emailTemplate = `
    <html>
    <body>
    <p>Dear ${investor.employees[0].first_name},</p>
    <p>Greetings from AY Ventures.</p>
    <p>We wanted to circle back regarding the investment opportunity we presented in ${startup.companyName}. With an impressive profile, ${startup.companyName} presents a compelling investment proposition.</p>
    <p>Despite the previous outreach, if you haven't had the chance to review this opportunity, we encourage you to take a closer look.</p>
    <p>If you have already reviewed ${startup.companyName}, we would be grateful to get some feedback so that we can bring more relevant companies for you in future that match your criteria.</p>
    <p>Thank you for your time and consideration.</p>
    <p>Regards,</p>
    <p>AY Ventures Investment Team</p>
    
    <footer>
    
    
    </footer>
    </body>
    </html>
    `;
  return emailTemplate;
}

export async function followUP2MailTemplate(investor, startup) {
  let emailTemplate = `
    <html>
    <body>
    <p>Dear ${investor.employees[0].first_name},</p>
<p>Just circling back regarding ${startup.companyName} investment opportunity as we have yet to receive a response from you.</p>
<p>Would you be interested in revisiting this opportunity or please share if you require further details?</p>
<p>If you have already reviewed  ${startup.companyName}, we would be grateful to get some feedback so that we can bring more relevant companies for you in future that match your criteria.</p>
<p>Regards,</p>
<p>AY Ventures Investment Team</p>

    <footer>
    
    
    </footer>
    </body>
    </html>
    `;
  return emailTemplate;
}

export async function initialMail2Template(investor, startup) {
    let emailTemplate = `
      <html>
      <body>
     <p>Dear ${investor.employees[1].first_name},</p>
  <p>Greetings from AY Ventures.</p>
      <p>We got in touch with ${investor.employees[0].first_name} from your firm but as we haven't received any response from ${investor.employees[0].first_name}, we wanted to circle back regarding the investment opportunity to invest in ${startup.currentRound} round of ${startup.companyName} from ${startup.location?.state},${startup.location?.country}.
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
      `;
    return emailTemplate;
  }
  