import { NextApiRequest, NextApiResponse } from "next";

let chefProfile = {
  name: "John Doe",
  description: "Expert in Italian cuisine",
  specialty: "Pasta",
};

import { NextApiRequest, NextApiResponse } from "next";
import sanitizeHtml from "sanitize-html";

let chefProfile = {
  name: "John Doe",
  description: "Expert in Italian cuisine",
  specialty: "Pasta",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    res.status(200).json(chefProfile);
  } else if (req.method === "POST") {
    const { name, description, specialty } = req.body;
    if (!name || !description || !specialty) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const sanitizedProfile = {
      name: sanitizeHtml(name),
      description: sanitizeHtml(description),
      specialty: sanitizeHtml(specialty),
    };
    chefProfile = sanitizedProfile;
    res.status(200).json({ message: "Profile updated successfully" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
}
