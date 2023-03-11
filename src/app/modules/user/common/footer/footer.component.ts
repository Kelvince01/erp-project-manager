import { Component } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  template: `
    <!-- Footer -->
    <footer class="sticky-footer bg-white">
      <div class="container my-auto">
        <div class="copyright text-center my-auto">
          <span
            >copyright &copy;
            <script>
              document.write(new Date().getFullYear());
            </script>
            - Developed with 💗 by
            <b>
              <a
                class="twitter-follow-button"
                href="https://twitter.com/Kelvince_"
                target="_blank"
              >
                <i class="fa fa-twitter" aria-hidden="true"></i>Kelvince</a
              >.
            </b>
          </span>
        </div>
      </div>
    </footer>
    <!-- Footer -->
  `,
  styles: [''],
})
export class FooterComponent {}
