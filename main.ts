// Gestion de la navigation active
class NavigationManager {
    private currentPage: string;

    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.highlightActiveNav();
    }

    private highlightActiveNav(): void {
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === this.currentPage || (this.currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Gestion du formulaire d'inscription
class TournamentRegistration {
    private form: HTMLFormElement;

    constructor() {
        this.form = document.getElementById('tournament-registration') as HTMLFormElement;
        this.init();
    }

    private init(): void {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupCharacterSelection();
        }
    }

    private setupCharacterSelection(): void {
        const characterSelect = document.getElementById('main-character') as HTMLSelectElement;
        if (characterSelect) {
            characterSelect.addEventListener('change', (e) => {
                this.updateCharacterPreview((e.target as HTMLSelectElement).value);
            });
        }
    }

    private updateCharacterPreview(character: string): void {
        console.log('Personnage sélectionné:', character);
        // Ici on pourrait afficher une preview du personnage
    }

    private handleSubmit(event: Event): void {
        event.preventDefault();
        
        const discordPseudo = (document.getElementById('discord-pseudo') as HTMLInputElement).value;
        const mainCharacter = (document.getElementById('main-character') as HTMLSelectElement).value;
        const skillLevel = (document.querySelector('input[name="level"]:checked') as HTMLInputElement).value;

        // Validation
        if (!this.validateDiscordPseudo(discordPseudo)) {
            alert('Veuillez entrer un pseudo Discord valide (ex: User#1234)');
            return;
        }

        // Simulation d'envoi
        this.submitRegistration({
            discordPseudo,
            mainCharacter,
            skillLevel,
            timestamp: new Date().toISOString()
        });
    }

    private validateDiscordPseudo(pseudo: string): boolean {
        const discordRegex = /^.+#\d{4}$/;
        return discordRegex.test(pseudo);
    }

    private async submitRegistration(data: any): Promise<void> {
        try {
            // Simulation d'envoi - dans la réalité, utiliser un webhook Discord ou un service backend
            console.log('Inscription soumise:', data);
            
            // Affichage message de succès
            alert('✅ Inscription envoyée avec succès ! Rejoignez notre Discord pour les prochaines étapes.');
            
            // Redirection vers la page Discord
            setTimeout(() => {
                window.location.href = 'discord.html';
            }, 2000);

            this.form.reset();

        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            alert('❌ Erreur lors de l\'inscription. Veuillez réessayer.');
        }
    }
}

// Gestion du statut Discord en temps réel
class DiscordStatus {
    private onlineMembersElement: HTMLElement;

    constructor() {
        this.onlineMembersElement = document.getElementById('online-members') as HTMLElement;
        this.init();
    }

    private init(): void {
        if (this.onlineMembersElement) {
            this.updateOnlineMembers();
            // Mise à jour périodique toutes les 30 secondes
            setInterval(() => this.updateOnlineMembers(), 30000);
        }
    }

    private async updateOnlineMembers(): Promise<void> {
        try {
            // Simulation - dans la réalité, utiliser l'API Discord
            const mockMembers = Math.floor(Math.random() * 50) + 20;
            this.onlineMembersElement.textContent = `${mockMembers} Members Online`;
            
            // Animation de mise à jour
            this.onlineMembersElement.style.opacity = '0.7';
            setTimeout(() => {
                this.onlineMembersElement.style.opacity = '1';
            }, 500);

        } catch (error) {
            console.error('Erreur de mise à jour du statut Discord:', error);
            this.onlineMembersElement.textContent = 'Hors ligne';
        }
    }
}

// Gestion des téléchargements
class DownloadManager {
    private downloadButtons: NodeListOf<HTMLAnchorElement>;

    constructor() {
        this.downloadButtons = document.querySelectorAll('a[href="#download"]');
        this.init();
    }

    private init(): void {
        this.downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleDownload(e));
        });
    }

    private handleDownload(event: Event): void {
        event.preventDefault();
        
        // Simulation de téléchargement
        const version = '1.2.0';
        const filename = `SSJ3_Project_v${version}.apk`;
        
        alert(`📥 Téléchargement de ${filename}...\n\n⚠️ Attention: Assurez-vous de désactiver la vérification des applications inconnues dans les paramètres de sécurité.`);
        
        // Ici, on redirigerait vers le vrai fichier
        // window.location.href = `downloads/${filename}`;
    }
}

// Gestion du classement en temps réel
class RankingManager {
    private participantsContainer: HTMLElement;

    constructor() {
        this.participantsContainer = document.querySelector('.participants-list') as HTMLElement;
        if (this.participantsContainer) {
            this.simulateLiveRanking();
        }
    }

    private simulateLiveRanking(): void {
        // Simulation de mises à jour de classement
        setInterval(() => {
            this.updateRandomPoints();
        }, 10000);
    }

    private updateRandomPoints(): void {
        const participants = document.querySelectorAll('.participant');
        participants.forEach(participant => {
            // 20% de chance de mise à jour
            if (Math.random() < 0.2) {
                const pointsElement = participant.querySelector('.points') as HTMLElement;
                const currentPoints = parseInt(pointsElement.textContent || '0');
                const newPoints = currentPoints + 1;
                
                pointsElement.textContent = `${newPoints} POINTS`;
                
                // Mise à jour de la progression
                const progressElement = participant.querySelector('.progress') as HTMLElement;
                const pointsLeft = Math.max(0, 100 - newPoints);
                progressElement.textContent = `${pointsLeft} points restants pour 50K Zenis`;
                
                // Animation
                pointsElement.style.color = '#4CAF50';
                setTimeout(() => {
                    pointsElement.style.color = '#f7931e';
                }, 1000);
            }
        });
    }
}

// Initialisation globale de l'application
class SSJ3App {
    constructor() {
        this.init();
    }

    private init(): void {
        document.addEventListener('DOMContentLoaded', () => {
            new NavigationManager();
            new TournamentRegistration();
            new DiscordStatus();
            new DownloadManager();
            new RankingManager();
            
            console.log('🚀 SSJ 3 Project initialisé');
        });
    }
}

// Lancement de l'application
new GodkuApp();