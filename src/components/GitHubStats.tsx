"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiGithub, FiGitBranch, FiCode } from "react-icons/fi";

interface GitHubStats {
  totalRepos: number;
  totalCommits: number;
  topLanguages: { name: string; percentage: number; color: string }[];
}

const languageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
};

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "mibrahimtariq";
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        const headers: HeadersInit = {
          "Accept": "application/vnd.github.v3+json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
        const reposData = await reposResponse.json();

        // Calculate stats
        const totalRepos = userData.public_repos;

        // Calculate language statistics
        const languageStats: { [key: string]: number } = {};
        reposData.forEach((repo: any) => {
          if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
          }
        });

        const totalWithLanguage = Object.values(languageStats).reduce((a: number, b: number) => a + b, 0);
        const topLanguages = Object.entries(languageStats)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 5)
          .map(([name, count]) => ({
            name,
            percentage: Math.round(((count as number) / totalWithLanguage) * 100),
            color: languageColors[name] || "#8b949e",
          }));

        // Fetch commit activity (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        let totalCommits = 0;
        
        // Get commit activity from top repos (to avoid rate limits)
        for (const repo of reposData.slice(0, 5)) {
          try {
            const commitsResponse = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/commits?since=${thirtyDaysAgo.toISOString()}&author=${username}`,
              { headers }
            );
            if (commitsResponse.ok) {
              const commits = await commitsResponse.json();
              totalCommits += commits.length;
            }
          } catch (err) {
            console.error(`Error fetching commits for ${repo.name}:`, err);
          }
        }

        setStats({
          totalRepos,
          totalCommits,
          topLanguages,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError("Failed to load GitHub data");
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section id="github-stats" className="relative py-8 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading GitHub stats...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section id="github-stats" className="relative py-8 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center text-muted-foreground">
            <p>{error || "Unable to load GitHub data"}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github-stats" className="relative py-8 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FiGithub className="w-8 h-8 text-primary" />
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              GitHub Activity
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Live data from my GitHub profile showing real coding activity and contributions
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          {[
            { label: "Repositories", value: stats.totalRepos, icon: FiGitBranch },
            { label: "Commits (30d)", value: stats.totalCommits, icon: FiCode },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg hover:border-primary/50 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-primary mb-4" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-base text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <FiCode className="text-primary" />
            <span>Top Languages</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-lg opacity-50"></div>
              <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                <div className="space-y-4">
                  {stats.topLanguages.map((lang, index) => (
                    <div key={lang.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{lang.name}</span>
                        <span className="text-sm text-muted-foreground">{lang.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Distribution Chart */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl blur-lg opacity-50"></div>
              <div className="relative bg-background/40 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-center h-full">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {stats.topLanguages.map((lang, index) => (
                      <motion.div
                        key={lang.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-sm">{lang.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

